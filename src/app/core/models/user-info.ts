export class UserInfo {
    status: number;
    message: string;
    data: UserInfoDetails;
}

export class UserInfoDetails {
    // tslint:disable-next-line: variable-name
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}
