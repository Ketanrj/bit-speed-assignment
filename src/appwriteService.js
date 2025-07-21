import { Client, Databases } from 'appwrite';
import { nanoid } from 'nanoid';

const conf = {
    Endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT) || "",
    ProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID) || "",
    DatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID) || "",
    CollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID) || "",
    DocumentID: String(import.meta.env.VITE_APPWRITE_DOCUMENT_ID) || "",
}

const client = new Client();

client.setEndpoint(conf.Endpoint)
.setProject(conf.ProjectID);


const databases = new Databases(client);

export const createDatabase = async (flowData) => {
    try {
        const response = await databases.updateDocument(
            conf.DatabaseID,
            conf.CollectionID,
            "nzECeU9rf_q0bu1Msb20k",
            {Flow : flowData}
        )
        if(response){
            console.log('Flow Saved Successfully!')
        }
        return;
    } catch (error) {
        console.error('Error saving flow:', error)
        throw error;
    }
}

export const getDocument = async () => {
    try{
            const data = await databases.getDocument(
            conf.DatabaseID,
            conf.CollectionID,
            conf.DocumentID
        );
        return data;
    }catch(error){
        throw error;
    }
}