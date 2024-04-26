import { BuddyTalkApi } from "./buddy-talk-api.interface";

export default interface BuddyTalkRequest {
  buddyApi: BuddyTalkApi;
  resource: string;
  body?: any;
}
