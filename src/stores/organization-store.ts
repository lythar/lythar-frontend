import { Organization, StoreKeys } from "@/types/globals";
import Store from "./base-store";
import { exampleConstants } from "@/example_data";

export class OrganizationStore extends Store<
  Organization[keyof Organization],
  keyof Organization
> {
  public override storeName = StoreKeys.OrganizationStore;

  constructor() {
    super();

    Object.assign(this.state, { ...exampleConstants });
  }
}
