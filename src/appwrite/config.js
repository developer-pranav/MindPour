import conf from "../conf/conf";
import { Permission, Role, Client, Storage, Databases, ID, Query } from "appwrite";
import authService from "./auth";

export class appwriteService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, username }) {
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,     // store user ID
                username    // store display name
            },
            [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId)),
            ]
        );
    } catch (error) {
        console.log("Appwrite :: createPost :: Error: ", error);
        throw error;
    }
}

    
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{title, content, featuredImage, status})
        } catch (error) {
            console.log("Appwrite :: updatePost :: Error: ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log("Appwrite :: deletePost :: Error: ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite :: getPost :: Error: ", error)
            return false;
        }
    }

    async getPosts(){
        try {
            const user = await authService.getCurrentUser(); // ✅ Get logged-in user
            const userId = user?.$id;


            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                [
                    Query.or([
                        Query.equal("status", ["active"]),
                        Query.equal("userId", [userId])
                    ])
                ]
            )
        } catch (error) {
            console.log("Appwrite :: listPost :: Error: ", error)
            return false;
        }
    }

    // File Upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: Error: ", error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );  
            return true;
        } catch (error) {
            console.log("Appwrite :: deleteFile :: Error: ", error)
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: filePreview :: Error: ", error)
        }
    }
}

// create instance and export
const appwrite = new appwriteService();
export default appwrite;