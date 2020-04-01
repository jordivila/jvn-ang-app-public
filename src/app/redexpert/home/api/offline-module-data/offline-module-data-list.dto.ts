

    export interface Filter {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface Pulse {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface BuckConverterNonSync {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface BuckConverterSync {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface BoostConverterNonSync {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface BoostConverterSync {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface SepicConverter {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface LossCalculator {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        locked4Anonymous: boolean;
        svgImage: string;
        groupTitle: string;
        limit: boolean;
        order: number;
    }

    export interface PFC {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface WPCCMatcher {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface Horticalculator {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface RangeEstimator {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface FlyBackDCM {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface FlyBackBMO {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface FlyBackQRM {
        img: string;
        sumary: string;
        category: string;
        titles: string;
        svgImage: string;
    }

    export interface Groups {
        Filter: Filter;
        Pulse: Pulse;
        BuckConverterNonSync: BuckConverterNonSync;
        BuckConverterSync: BuckConverterSync;
        BoostConverterNonSync: BoostConverterNonSync;
        BoostConverterSync: BoostConverterSync;
        SepicConverter: SepicConverter;
        LossCalculator: LossCalculator;
        PFC: PFC;
        WPCCMatcher: WPCCMatcher;
        Horticalculator: Horticalculator;
        RangeEstimator: RangeEstimator;
        FlyBackDCM: FlyBackDCM;
        FlyBackBMO: FlyBackBMO;
        FlyBackQRM: FlyBackQRM;
    }

    export interface Options {
        singlePane: boolean;
        hiddenSelection: boolean;
    }

    export interface Apps {
        groups: Groups;
        classes: string[];
        titles: string[];
        options: Options;
    }

    export interface Menu {
        sort: number;
        category: string;
        icon: string;
        title: string;
        active: boolean;
        sumary: string;
        groupimages: string;
        apps: Apps;
        showAsInternal?: boolean;
        classes: string[];
        titles: string[];
    }

    export interface OfflineModuleDataList {
        ModuleID: number;
        Name: string;
        Menu: Menu;
        Division: string;
    }

