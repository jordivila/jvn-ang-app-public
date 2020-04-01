export interface RouteDataCustomized {
    icon: string;
    title: string;
    isMenuItem: boolean;
    childs?: RouteDataChildCustomized[];
}

export interface RouteDataChildCustomized extends RouteDataCustomized {
    subPath: string;
}

export class RouteDataCustomized {
    constructor(
        public icon: string,
        public title: string,
        public isMenuItem: boolean) {

    }
}

export class RouteDataChildCustomized extends RouteDataCustomized {
    constructor(
        public icon: string,
        public title: string,
        public isMenuItem: boolean,
        public subPath: string) {
        super(icon, title, isMenuItem);
    }
}
