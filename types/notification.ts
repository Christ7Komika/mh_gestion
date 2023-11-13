import { NotificationItem } from "@/app/api/notification/route";

export interface Notification {
  expiredIn10Days: NotificationItem[];
  expiredToday: NotificationItem[];
  expired: NotificationItem[];
}
