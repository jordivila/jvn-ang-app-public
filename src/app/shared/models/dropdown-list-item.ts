export enum DisplayType {
    none,
    text, // text types emit a "change" event that you can cach
    button,
    line,
    link  // link types navigate to a different page depending on your href attribute
  }

export interface DropdownListItem {
    name: string;
    key: string;
    displayType: DisplayType;
    selected?: boolean;
    icon?: string;
    href?: string; // in case of DisplayType===Link
    childs?: DropdownListItem[];
  }
