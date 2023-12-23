import { UserProfile } from '@loopback/security';
export declare class AuthenticationController {
    getCurrentUser(profile: UserProfile): Promise<{
        userId: any;
        userDataInAccessToken: any;
    }>;
}
