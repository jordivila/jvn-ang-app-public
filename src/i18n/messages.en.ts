import { i18nTexts } from './messages.types';

export const messagesEn: i18nTexts.RootObject = {
    common: {
        authErrorMessage: 'Authentication error. You were redirected to login page.',
        checkingPermissions: 'Checking user permissions',
        errUnhandled: 'Oops... unhandled error',
        loginTitle: 'Login',
        notFoundUrlTitle: 'Not Found'
    },
    filterDesign: {
        mainAppMenuLink: 'Filter Designer',
        topNavBar: {
            parameters: 'Parameters',
            selectAndSimulate: 'Comp. Selection and Simulation',
            summary: 'Summary'
        },
        paramsForm: {
            title: `Parameters for:`,
            chooseTypology: 'Choose a Tipology',
            parametersFor: 'Paremeters for:',
            sharedInputCapacitor: 'Shared input capacitor DC/DC converter',
            msgGettingFormData: 'Retreving parameters data',
            msgErrorGettingFormData: 'Sorry, something went wrong loading form data',
            msgSavingData: 'Saving parameters data',
            userSaved: 'Form parameters saved successfully.'
        }
    },
    navbarMenu: {
        home: 'Home',
        errUnhandled: 'Raise unhandled error',
        userAccounts: 'User CRUD',
        i18nSample: 'i18n Samples',
        modals: 'Modal Components',
        sessionTimer: 'Session Timer',
        routeChilds: 'Route Childs',
        themes: 'Themes/Appearance'

    },
    userDropdownMenu: {
        signOut: 'Sign Out',
        userGuide: 'User Guide',
        languages: 'Languages'
    },
    redexpert: {
        standardModules: {
            filter: {
                initMessage: 'Use filter to search',
                noDataFoundMessage: 'No products found',
                rightPanelFilterTitle: 'Filter'
            }
        }
    },
    crudFilterExpand: {
        addUser: 'Add user',
        editUser: 'Edit user',
        initMessage: 'Use filter to search users',
        msgGettingFormData: 'Retreving account data',
        msgErrorGettingFormData: 'Sorry, something went wrong loading form data',
        msgSavingData: 'Saving user data',
        noDataFoundMessage: 'No users found',
        userSaved: 'User account saved successfully.'
    },

};
