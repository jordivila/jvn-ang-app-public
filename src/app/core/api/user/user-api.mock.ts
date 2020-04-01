import { UserRow, UserDetails } from './user-api.dto';
import { GuidHelper } from 'src/app/shared/helpers/guid-helper';


export const userServiceMockListDataCreate = (): UserRow[] => {
    const result = [];
    for (let i = 0; i < 100; i++) {
        result.push({
            userId: GuidHelper.create().toString(),
            email: `user${i}@email.com`,
            fullName: `user ${i} name`,
            loginName: `login${i}name`,
            primaryCompanyName: `user ${i} primaryCompany`,
            activationOrDeactivationDate: new Date(),
            isActive: true,
            isPrivileged: true
        } as UserRow);
    }
    return result;
};


// export const userServiceMockListData: UserRow[] = userServiceMockListDataCreate();

// export let userServiceMock: UserApi = {
//     url: (...args: string[]) => '/users/',
//     list: (filterModel: Filter,
//         // paginationModel: PaginationModel,
//         // sortModel: SortModel
//     ) => of({
//         total: userServiceMockListData.length,
//         results: userServiceMockListData
//     } as PaginatedResults<UserRow>),
//     get: (userId: string) => of({} as UserDetails),
//     post: (userCreateModel: UserPostPut) => of({}),
//     put: (userEditModel: any) => of({})
// };



export const userDetailsMockGet = () => Object.assign({}, {
    id: '143a0f5c-a109-4ff2-a145-a5370738dc8c',
    firstName: 'John',
    lastName: 'Doe [dpartner-9vp]',
    userName: 'dpartner-9vp',
    email: 'test.test.str@jvn.com',
    primaryCompany: {
        cid: '010142',
        id: '750dc58d-67c3-40d9-a0a8-daeee4e96399',
        pid: null,
        name: 'Client [010142]'
    },
    isUserAccountActive: true,
    lastActivationDeactivationDate: null,
    isPrivilegedContact: false,
    passwordStatus: 0,
    applications: [],
} as UserDetails) as UserDetails;
