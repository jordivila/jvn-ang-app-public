export interface FileMetadata {
    id?: string;
    dateUploaded: Date;
    name: string;
    size: number;
    totalPages: number; // a PDF can contain more than one image
}
