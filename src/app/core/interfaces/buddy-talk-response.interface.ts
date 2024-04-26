export default interface BuddyTalkResponse<TData> {
  success: boolean;
  data: TData;
  errors: Array<string>;
}

