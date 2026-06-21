export namespace main {
	
	export class ImageStruct {
	    FileName: string;
	    FileType: string;
	    FilePath: string;
	    ConvertedPath: string;
	    Preview: string;
	
	    static createFrom(source: any = {}) {
	        return new ImageStruct(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.FileName = source["FileName"];
	        this.FileType = source["FileType"];
	        this.FilePath = source["FilePath"];
	        this.ConvertedPath = source["ConvertedPath"];
	        this.Preview = source["Preview"];
	    }
	}

}

