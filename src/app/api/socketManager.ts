/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/socketManager.ts
import { io, Socket } from "socket.io-client";
import type { AppDispatch } from "../store";
import { addMessage, removeMessage } from "../slice/messageSlice";
import { v4 as uuidv4 } from "uuid";

// Types from WebSocket Documentation
interface AuthSuccessPayload {
  message: string;
  userId: string;
  role: "customer" | "driver";
}

interface AuthFailedPayload {
  error: string;
}

interface MoveSearchingPayload {
  moveId: string;
  message: string;
  attempt: number;
}

interface DriverAssignedPayload {
  moveId: string;
  driver: {
    name: string;
    vehicle: {
      make: string;
      model: string;
      plateNumber: string;
    };
    rating: number;
    estimatedArrivalTime: string;
  };
}

interface MoveStatusUpdatedPayload {
  moveId: string;
  status: string;
  message: string;
}

interface MoveCancelledPayload {
  moveId: string;
  message: string;
}

interface NoDriversAvailablePayload {
  moveId: string;
  message: string;
}

interface DriverNewMoveRequestPayload {
  moveId: string;
  pickup: {
    address: string;
    coordinates: [number, number];
  };
  delivery: {
    address: string;
    coordinates: [number, number];
  };
  totalPrice: number;
  distance: number;
  vehicleType: string;
  timeout: number;
}

interface DriverLocationUpdatedPayload {
  moveId: string;
  driverId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  remainingDistance: string;
}

class SocketManager {
  private socket: Socket | null = null;
  private dispatch: AppDispatch | null = null;
  private authenticationTimeout: NodeJS.Timeout | null = null;
  private isAuthenticating = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  /**
   * Initialize socket connection following WebSocket API documentation
   * Step 1: Setup listeners FIRST (critical requirement from docs)
   * Step 2: Connect to socket
   * Step 3: Authenticate
   */
  initialize(
    token: string,
    dispatch: AppDispatch,
    userRole: "customer" | "driver"
  ) {
    if (this.socket?.connected) {
      console.log("✅ Socket already connected");
      return;
    }

    if (this.isAuthenticating) {
      console.log("⏳ Authentication in progress...");
      return;
    }

    this.dispatch = dispatch;
    this.isAuthenticating = true;

    console.log("🔌 Initializing socket for role:", userRole);

    // Create socket instance (but don't connect yet)
    this.socket = io(import.meta.env.VITE_BASE_URL || "", {
      autoConnect: false, // Critical: Don't auto-connect
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    // Step 1: Setup authentication listeners BEFORE connecting (as per docs)
    this.setupAuthListeners();

    // Step 2: Setup connection event handlers
    this.setupConnectionHandlers(token);

    // Step 3: Setup role-specific event listeners
    if (userRole === "customer") {
      this.setupCustomerListeners();
    } else if (userRole === "driver") {
      this.setupDriverListeners();
    }

    // Step 4: Now connect (after all listeners are ready)
    console.log("🔌 Connecting to socket...");
    this.socket.connect();

    // Step 5: Set authentication timeout (10 seconds as per docs)
    this.authenticationTimeout = setTimeout(() => {
      if (this.isAuthenticating) {
        console.error("❌ Authentication timeout (10 seconds exceeded)");
        this.handleAuthenticationFailure("Authentication timeout");
      }
    }, 10000);
  }

  /**
   * Setup authentication listeners (BEFORE connection as per docs)
   */
  private setupAuthListeners() {
    if (!this.socket) return;

    // Success handler
    this.socket.on("authentication_success", (data: AuthSuccessPayload) => {
      console.log("✅ Authentication successful:", data);

      this.isAuthenticating = false;

      if (this.authenticationTimeout) {
        clearTimeout(this.authenticationTimeout);
        this.authenticationTimeout = null;
      }

      console.log(`✅ Authenticated as ${data.role}: ${data.userId}`);

      // this.dispatch?.(
      //   addMessage({
      //     id: uuidv4(),
      //     text: `Connected as ${data.role}`,
      //   })
      // );
    });

    // Failure handler (server will disconnect after this)
    this.socket.on("authentication_failed", (data: AuthFailedPayload) => {
      console.error("❌ Authentication failed:", data.error);
      this.handleAuthenticationFailure(data.error);
    });
  }

  /**
   * Setup connection event handlers
   */
  private setupConnectionHandlers(token: string) {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("✅ Socket connected, ID:", this.socket?.id);
      console.log("🔐 Attempting authentication...");

      this.socket?.emit("client:authenticate", { token });

      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      this.isAuthenticating = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
      this.isAuthenticating = false;
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error("❌ Max reconnection attempts reached");
        this.disconnect();
      }
    });
  }

  /**
   * Setup customer-specific event listeners (as per WebSocket API docs)
   */
  private setupCustomerListeners() {
    if (!this.socket) return;

    // Move request lifecycle events
    this.socket.on(
      "move:searching_for_driver",
      (data: MoveSearchingPayload) => {
        console.log("🔍 Searching for driver, attempt:", data.attempt);
        this.dispatch?.(
          addMessage({
            id: data.moveId,
            text: data.message,
          })
        );
      }
    );

    this.socket.on("move:accepted", (data: DriverAssignedPayload) => {
      console.log("🚗 Driver assigned:", data.driver.name);
      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: `Driver ${data.driver.name} is on the way!`,
        })
      );

      // Auto remove after 1 minute
      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    this.socket.on("move:status_update", (data: MoveStatusUpdatedPayload) => {
      console.log("📊 Move status updated:", data.status);
      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: data.message,
        })
      );

      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    this.socket.on(
      "move:no_drivers_found",
      (data: NoDriversAvailablePayload) => {
        console.log("❌ No drivers available");
        this.dispatch?.(
          addMessage({
            id: data.moveId,
            text: data.message,
          })
        );

        setTimeout(() => {
          this.dispatch?.(removeMessage(data.moveId));
        }, 60_000);
      }
    );

    this.socket.on("move:cancelled", (data: MoveCancelledPayload) => {
      console.log("🚫 Move cancelled:", data.message);
      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: data.message,
        })
      );

      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    // Driver location tracking (for customer app)
    this.socket.on(
      "customer:driver_location_updated",
      (data: DriverLocationUpdatedPayload) => {
        console.log("📍 Driver location updated:", data.location);
        // You can dispatch this to a different slice for map updates
        // Example: dispatch(updateDriverLocation(data));
      }
    );

    this.socket.onAny((event, ...args) => {
      console.log("📨 [socket onAny] event:", event, "args:", args);
    });
  }

  /**
   * Setup driver-specific event listeners (as per WebSocket API docs)
   */
  private setupDriverListeners() {
    if (!this.socket) return;

    // New move request (most important for drivers)
    this.socket.on(
      "driver:new_move_request",
      (data: DriverNewMoveRequestPayload) => {
        console.log("🆕 New move request received:", data.moveId);
        this.dispatch?.(
          addMessage({
            id: data.moveId,
            text: `New move: ${data.pickup.address} → ${data.delivery.address}`,
          })
        );

        // Show notification modal with Accept/Reject buttons
        // Start countdown timer based on data.timeout
        console.log("⏰ Timeout for response:", data.timeout / 1000, "seconds");
      }
    );

    this.socket.on("move:cancelled", (data: MoveCancelledPayload) => {
      console.log("🚫 Move cancelled:", data.message);
      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: data.message,
        })
      );

      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    this.socket.on("move:status_updated", (data: MoveStatusUpdatedPayload) => {
      console.log("📊 Move status updated:", data.status);
      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: data.message,
        })
      );

      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    this.socket.onAny((event, ...args) => {
      console.log("📨 [socket onAny] event:", event, "args:", args);
    });
  }

  /**
   * Handle authentication failure
   */
  private handleAuthenticationFailure(error: string) {
    this.isAuthenticating = false;

    if (this.authenticationTimeout) {
      clearTimeout(this.authenticationTimeout);
      this.authenticationTimeout = null;
    }

    this.dispatch?.(
      addMessage({
        id: uuidv4(),
        text: `Authentication failed: ${error}`,
      })
    );

    // Disconnect socket
    this.disconnect();

    // Redirect to login might be needed here
    // window.location.href = '/login';
  }

  /**
   * Send driver location update (for driver app only)
   * As per WebSocket API documentation
   */
  sendDriverLocation(moveId: string, latitude: number, longitude: number) {
    if (!this.socket?.connected) {
      console.warn("⚠️ Cannot send location - socket not connected");
      return;
    }

    this.socket.emit("driver:location_update", {
      moveId,
      location: { latitude, longitude },
    });

    console.log("📍 Location update sent:", { latitude, longitude });
  }

  /**
   * Update authentication token (when refreshed)
   */
  updateToken(token: string) {
    if (this.socket?.connected) {
      console.log("🔄 Updating authentication token...");
      this.socket.emit("client:authenticate", { token });
    }
  }

  /**
   * Emit custom events
   */
  emit(event: string, data?: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("⚠️ Cannot emit - socket not connected");
    }
  }

  /**
   * Listen to specific event
   */
  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  /**
   * Remove specific listener
   */
  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  /**
   * Disconnect and cleanup
   */
  disconnect() {
    if (this.authenticationTimeout) {
      clearTimeout(this.authenticationTimeout);
      this.authenticationTimeout = null;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    this.dispatch = null;
    this.isAuthenticating = false;
    this.reconnectAttempts = 0;

    console.log("🔌 Socket disconnected and cleaned up");
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get socket instance (for advanced usage)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export singleton instance
export const socketManager = new SocketManager();
