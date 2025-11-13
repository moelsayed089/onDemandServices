/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/socketManager.ts
import { io, Socket } from "socket.io-client";
import type { AppDispatch } from "../store";
import { addMessage, removeMessage } from "../slice/messageSlice";
import toast from "react-hot-toast";

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
  private userRole: "customer" | "driver" | null = null;

  /**
   * Initialize socket connection following WebSocket API documentation
   */
  initialize(
    token: string,
    dispatch: AppDispatch,
    userRole: "customer" | "driver"
  ) {
    // ✅ Check if already connected
    if (this.socket?.connected && this.userRole === userRole) {
      console.log("✅ Socket already connected for role:", userRole);
      return;
    }

    // ✅ Disconnect old socket if exists
    if (this.socket) {
      console.log("🔄 Disconnecting old socket...");
      this.disconnect();
    }

    if (this.isAuthenticating) {
      console.log("⏳ Authentication in progress...");
      return;
    }

    this.dispatch = dispatch;
    this.userRole = userRole;
    this.isAuthenticating = true;

    console.log("🔌 Initializing socket for role:", userRole);

    // ✅ Create socket instance
    this.socket = io(import.meta.env.VITE_BASE_URL || "", {
      autoConnect: false,
      transports: ["websocket", "polling"], // ✅ Add polling as fallback
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 20000, // ✅ Increase timeout
    });

    // ✅ Setup all listeners BEFORE connecting
    this.setupAuthListeners();
    this.setupConnectionHandlers(token);

    if (userRole === "customer") {
      this.setupCustomerListeners();
    } else if (userRole === "driver") {
      this.setupDriverListeners();
    }

    // ✅ Now connect
    console.log("🔌 Connecting to socket...");
    this.socket.connect();

    // ✅ Set authentication timeout
    this.authenticationTimeout = setTimeout(() => {
      if (this.isAuthenticating) {
        console.error("❌ Authentication timeout (20 seconds exceeded)");
        this.handleAuthenticationFailure("Authentication timeout");
      }
    }, 20000);
  }

  /**
   * Setup authentication listeners
   */
  private setupAuthListeners() {
    if (!this.socket) return;

    this.socket.on("authentication_success", (data: AuthSuccessPayload) => {
      console.log("✅ Authentication successful:", data);
      this.isAuthenticating = false;

      if (this.authenticationTimeout) {
        clearTimeout(this.authenticationTimeout);
        this.authenticationTimeout = null;
      }

      toast.success(`Connected as ${data.role}`, {
        position: "bottom-right",
        duration: 2000,
      });
    });

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

      // ✅ Emit authentication immediately
      this.socket?.emit("client:authenticate", { token });
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      this.isAuthenticating = false;

      toast.error("Disconnected from server", {
        position: "bottom-right",
        duration: 2000,
      });
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
      this.isAuthenticating = false;
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error("❌ Max reconnection attempts reached");
        toast.error("Failed to connect to server", {
          position: "bottom-right",
        });
        this.disconnect();
      }
    });
  }

  /**
   * Setup customer-specific event listeners
   */
  private setupCustomerListeners() {
    if (!this.socket) return;

    this.socket.on(
      "move:searching_for_driver",
      (data: MoveSearchingPayload) => {
        console.log("🔍 Searching for driver, attempt:", data.attempt);

        toast.loading(data.message, {
          id: data.moveId,
          position: "bottom-right",
        });

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

      toast.success(`Driver ${data.driver.name} is on the way!`, {
        id: data.moveId,
        position: "bottom-right",
        duration: 5000,
      });

      this.dispatch?.(
        addMessage({
          id: data.moveId,
          text: `Driver ${data.driver.name} is on the way!`,
        })
      );

      setTimeout(() => {
        this.dispatch?.(removeMessage(data.moveId));
      }, 60_000);
    });

    this.socket.on("move:status_update", (data: MoveStatusUpdatedPayload) => {
      console.log("📊 Move status updated:", data.status);

      toast.success(data.message, {
        id: data.moveId,
        position: "bottom-right",
        duration: 5000,
      });

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

        toast.error(data.message, {
          id: data.moveId,
          position: "bottom-right",
          duration: 5000,
        });

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

      toast.error(data.message, {
        id: data.moveId,
        position: "bottom-right",
        duration: 5000,
      });

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
      "customer:driver_location_updated",
      (data: DriverLocationUpdatedPayload) => {
        console.log("📍 Driver location updated:", data.location);
        // You can dispatch this to a map slice
      }
    );

    // ✅ Log all events for debugging
    this.socket.onAny((event, ...args) => {
      console.log("📨 [Customer Event]", event, args);
    });
  }

  /**
   * Setup driver-specific event listeners
   */
  private setupDriverListeners() {
    if (!this.socket) return;

    this.socket.on(
      "driver:new_move_request",
      (data: DriverNewMoveRequestPayload) => {
        console.log("🆕 New move request received:", data.moveId);

        toast.success(
          `New move: ${data.pickup.address} → ${data.delivery.address}`,
          {
            id: data.moveId,
            position: "bottom-right",
            duration: data.timeout / 1000,
          }
        );

        this.dispatch?.(
          addMessage({
            id: data.moveId,
            text: `New move: ${data.pickup.address} → ${data.delivery.address}`,
          })
        );

        console.log("⏰ Timeout for response:", data.timeout / 1000, "seconds");
      }
    );

    this.socket.on("move:cancelled", (data: MoveCancelledPayload) => {
      console.log("🚫 Move cancelled:", data.message);

      toast.error(data.message, {
        id: data.moveId,
        position: "bottom-right",
        duration: 5000,
      });

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

      toast.success(data.message, {
        id: data.moveId,
        position: "bottom-right",
        duration: 5000,
      });

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

    // ✅ Log all events for debugging
    this.socket.onAny((event, ...args) => {
      console.log("📨 [Driver Event]", event, args);
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

    toast.error(`Authentication failed: ${error}`, {
      position: "bottom-right",
    });

    this.disconnect();
  }

  /**
   * Send driver location update (for driver app only)
   */
  sendDriverLocation(moveId: string, latitude: number, longitude: number) {
    if (!this.socket?.connected) {
      console.warn("⚠️ Cannot send location - socket not connected");
      return false;
    }

    this.socket.emit("driver:location_update", {
      moveId,
      location: { latitude, longitude },
    });

    console.log("📍 Location update sent:", { latitude, longitude });
    return true;
  }

  /**
   * Update authentication token
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
      console.log("📤 Emitted event:", event, data);
      return true;
    } else {
      console.warn("⚠️ Cannot emit - socket not connected");
      return false;
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
    this.userRole = null;

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
