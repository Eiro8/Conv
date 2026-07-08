export namespace models {
	
	export class ConversionInfo {
	    NewPath: string;
	    NewSize: number;
	
	    static createFrom(source: any = {}) {
	        return new ConversionInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.NewPath = source["NewPath"];
	        this.NewSize = source["NewSize"];
	    }
	}
	export class ImageStruct {
	    ID: number;
	    FileName: string;
	    FileType: string;
	    FilePath: string;
	    FileSize: number;
	    IsConverted: boolean;
	    ConvertTo: string;
	    ConvertedPath: string;
	    ConvertedSize: number;
	    Base64Preview: string;
	
	    static createFrom(source: any = {}) {
	        return new ImageStruct(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.FileName = source["FileName"];
	        this.FileType = source["FileType"];
	        this.FilePath = source["FilePath"];
	        this.FileSize = source["FileSize"];
	        this.IsConverted = source["IsConverted"];
	        this.ConvertTo = source["ConvertTo"];
	        this.ConvertedPath = source["ConvertedPath"];
	        this.ConvertedSize = source["ConvertedSize"];
	        this.Base64Preview = source["Base64Preview"];
	    }
	}

}

