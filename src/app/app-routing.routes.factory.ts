import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth-guard';
import { environment } from '../environments/environment';
import { i18nMessages } from './core/services/i18n/i18n.config';
import { RedExpertModulesRouteMatcher } from './redexpert/redexpert-iframe/redexpert-iframe-routing';
import { RouteDataCustomized } from './shared/models/route-data-customized';


export const APP_LOGIN_ROUTE: Route = {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {
        icon: 'person',
        title: i18nMessages.common.loginTitle,
        isMenuItem: true
    }as RouteDataCustomized
};

export const APP_HOME_ROUTE: Route = {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'home',
        title: 'Home',
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_REDEXPERT_MODULES: Route = {
    matcher: RedExpertModulesRouteMatcher,
    loadChildren: () => import('./redexpert/redexpert-iframe/redexpert-iframe.module').then(m => m.RedexpertIframeModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'line_style',
        title: 'RedExpert Modules',
        isMenuItem: false,
    } as RouteDataCustomized
};

export const APP_REDEXPERT_HOME: Route = {
    path: 'redexpert/home',
    loadChildren: () => import('./redexpert/home/product-viewer.module').then(m => m.ProductViewerModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'line_style',
        title: 'Electronics',
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_ERRUNHANDLED_ROUTE: Route = {
    path: 'samples/errunhandled',
    redirectTo: '/samples/errunhandled', // just force an unhandled exception
    canActivate: [AuthGuard],
    data: {
        icon: 'error',
        title: i18nMessages.navbarMenu.errUnhandled,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_CRUD_SAMPLE_ROUTE: Route = {
    path: 'samples/crud-filter-expand',
    loadChildren: () => import('./samples/crud-sample/crud-sample.module').then(m => m.CrudSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'group_add',
        title: i18nMessages.navbarMenu.userAccounts,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_I18_ROUTE: Route = {
    path: 'samples/i18n',
    loadChildren: () => import('./samples/i18n-sample/i18n-sample.module').then(m => m.I18nSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'language',
        title: i18nMessages.navbarMenu.i18nSample,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_MODALS_ROUTE: Route = {
    path: 'samples/modals',
    loadChildren: () => import('./samples/modals-sample/modals-sample.module').then(m => m.ModalsSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'layers',
        title: i18nMessages.navbarMenu.modals,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_SESSION_TIMER_ROUTE: Route = {
    path: 'samples/session-timer',
    loadChildren: () => import('./samples/session-timer-sample/session-timer-sample.module').then(m => m.SessionTimerSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'timer',
        title: i18nMessages.navbarMenu.sessionTimer,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_CHILD_ROUTE: Route = {
    path: 'samples/child-routes',
    loadChildren: () => import('./samples/child-route-sample/child-route-sample.module').then(m => m.ChildRouteSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'subdirectory_arrow_right',
        title: i18nMessages.navbarMenu.routeChilds,
        isMenuItem: true
    } as RouteDataCustomized,
};

export const APP_THEME_SAMPLE_ROUTE: Route = {
    path: 'samples/theme',
    loadChildren: () => import('./samples/theme-sample/theme-sample.module').then(m => m.ThemeSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'palette',
        title: i18nMessages.navbarMenu.themes,
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_FLEX_LAYOUT_SAMPLE_ROUTE: Route = {
    path: 'samples/flex-layout',
    loadChildren: () => import('./samples/flex-layout-sample/flex-layout-sample.module').then(m => m.FlexLayoutSampleModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'line_style',
        title: 'Flex Layout',
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_COORDS_AREA_ROUTE: Route = {
    path: 'coords',
    loadChildren: () => import('./samples/coords-img-area/coords-img-area.module').then(m => m.CoordsAreaSelectorModule),
    canActivate: [AuthGuard],
    data: {
        icon: 'crop_free',
        title: 'Img Coords Selector',
        isMenuItem: true
    } as RouteDataCustomized
};

export const APP_DEFAULT_ROUTE = APP_HOME_ROUTE;

export const AppRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: APP_DEFAULT_ROUTE.path },

    APP_LOGIN_ROUTE,
    APP_REDEXPERT_HOME,
    APP_REDEXPERT_MODULES,
    APP_ERRUNHANDLED_ROUTE,

    APP_CRUD_SAMPLE_ROUTE,
    APP_I18_ROUTE,
    APP_MODALS_ROUTE,
    APP_SESSION_TIMER_ROUTE,
    APP_THEME_SAMPLE_ROUTE,
    APP_CHILD_ROUTE,
    APP_FLEX_LAYOUT_SAMPLE_ROUTE,
    APP_COORDS_AREA_ROUTE,

    {
        path: '404',
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
        // canActivate: [AuthGuard],
        data: {
            icon: '',
            title: i18nMessages.common.notFoundUrlTitle,
            isMenuItem: !environment.production
        } as RouteDataCustomized
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
