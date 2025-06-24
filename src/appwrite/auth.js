import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // ✅ Create account and login automatically
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.log("Appwrite :: createAccount :: Error:", error.message);
            throw error;
        }
    }

    // ✅ Safe login
    async login({ email, password }) {
        try {
            try {
                await this.account.deleteSessions();
            } catch (err) {
                console.warn("Session delete failed or not needed:", err.message);
            }

            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite :: login :: Error:", error.message);
            throw error;
        }
    }

    // ✅ Logout
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: logout :: Error:", error.message);
            throw error;
        }
    }

    // ✅ Get current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite :: getCurrentUser :: Error:", error.message);
            return null;
        }
    }

    // ✅ Update Name
    async updateName(name) {
        return await this.account.updateName(name);
    }

    // ✅ Update Password
    async updatePassword(newPassword) {
        return await this.account.updatePassword(newPassword);
    }
}

// ✅ Export instance
const authService = new AuthService();
export default authService;