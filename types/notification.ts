import { ElementStatus } from "@/app/api/notification/route";

export interface Notification {
  expiredIn10Days: ElementStatus[];
  expiredToday: ElementStatus[];
  expired: ElementStatus[];
}
