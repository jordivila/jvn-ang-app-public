// tslint:disable-next-line: no-namespace
export namespace i18nTexts {

    export interface RootObject {
        common: Common;
        filterDesign: FilterDesign;
        navbarMenu: NavbarMenu;
        userDropdownMenu: UserDropdownMenu;
        redexpert: Redexpert;
        crudFilterExpand: CrudFilterExpand;
    }


    export interface Common {
        authErrorMessage: string;
        checkingPermissions: string;
        errUnhandled: string;
        loginTitle: string;
        notFoundUrlTitle: string;
    }

    export interface TopNavBar {
        parameters: string;
        selectAndSimulate: string;
        summary: string;
    }

    export interface ParamsForm {
        title: string;
        chooseTypology: string;
        parametersFor: string;
        sharedInputCapacitor: string;
        msgGettingFormData: string;
        msgErrorGettingFormData: string;
        msgSavingData: string;
        userSaved: string;
    }

    export interface FilterDesign {
        mainAppMenuLink: string;
        topNavBar: TopNavBar;
        paramsForm: ParamsForm;
    }

    export interface NavbarMenu {
        home: string;
        errUnhandled: string;
        userAccounts: string;
        i18nSample: string;
        modals: string;
        sessionTimer: string;
        routeChilds: string;
        themes: string;
    }

    export interface UserDropdownMenu {
        signOut: string;
        userGuide: string;
        languages: string;
    }

    export interface Filter {
        initMessage: string;
        noDataFoundMessage: string;
        rightPanelFilterTitle: string;
    }

    export interface StandardModules {
        filter: Filter;
    }

    export interface Redexpert {
        standardModules: StandardModules;
    }

    export interface CrudFilterExpand {
        addUser: string;
        editUser: string;
        initMessage: string;
        msgGettingFormData: string;
        msgErrorGettingFormData: string;
        msgSavingData: string;
        noDataFoundMessage: string;
        userSaved: string;
    }


}

