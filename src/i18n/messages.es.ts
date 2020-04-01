import { i18nTexts } from './messages.types';

export const messagesEs: i18nTexts.RootObject = {
  common: {
    authErrorMessage: 'Error de autorización. Fuiste redirigido a la página de login.',
    checkingPermissions: 'Comprobando los permisos de usuario',
    errUnhandled: 'Oops... ha ocurrido un error inesperado',
    loginTitle: 'Login',
    notFoundUrlTitle: 'Página no encontrada'
  },
  filterDesign: {
    mainAppMenuLink: 'Filter Designer',
    topNavBar: {
      parameters: 'Parámetros',
      selectAndSimulate: 'Selecciona comp. y simulación',
      summary: 'Resumen'
    },
    paramsForm: {
      title: `Parametros:`,
      chooseTypology: 'Seleccione la tipología',
      parametersFor: 'Parámetros para:',
      sharedInputCapacitor: 'Condensador de entrada compartida convertidor DC / DC',
      msgGettingFormData: 'Obteniendo parámetros',
      msgErrorGettingFormData: 'Ups, algo falló obteniendo información',
      msgSavingData: 'Guardando los parámetros del formulario',
      userSaved: 'Parámetros del formulario guardados correctamente.',
    }
  },
  navbarMenu: {
    home: 'Inicio',
    errUnhandled: 'Errores',
    userAccounts: 'Usuarios CRUD',
    i18nSample: 'i18n Ejemplos',
    modals: 'Componentes modales',
    sessionTimer: 'Session Timer',
    routeChilds: 'Route Childs (Subrutas)',
    themes: 'Apariencia'
  },
  userDropdownMenu: {
    signOut: 'Desconectar',
    userGuide: 'Guía de usuario',
    languages: 'Idiomas'
  },
  redexpert: {
    standardModules: {
      filter: {
        initMessage: 'Usa los filttros para buscar componentes',
        noDataFoundMessage: 'No se han encontrado productos',
        rightPanelFilterTitle: 'Filtro'
      }
    }
  },
  crudFilterExpand: {
    addUser: 'Añadir usuario',
    editUser: 'Editar usuario',
    initMessage: 'Usa los filtros para buscar usuarios',
    msgGettingFormData: 'Obteniendo información de la cuenta',
    msgErrorGettingFormData: 'Oops, algo ha ido mal obteniendo la información',
    msgSavingData: 'Guardando la información de usuario',
    noDataFoundMessage: 'No se han encontrado usuarios',
    userSaved: 'Cuenta de usuario guardada.'
  },

};
