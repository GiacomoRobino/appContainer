export class HtmlHandler {
    private markdownChange : MarkDown = new MarkDown();
    public TextChangedHandler(id: string, output: string): void {
        let markdown = <HTMLTextAreaElement>document.getElementById(id);
        let markdownOutput = <HTMLTextAreaElement>document.getElementById(output);
        if (markdown !== null){
            markdown.onkeyup = (e) => {
                this.RenderHtmlContent(markdown, markdownOutput);
            }
            window.onload = (e) => {
                this.RenderHtmlContent(markdown, markdownOutput);
            }
        }
    }


private RenderHtmlContent(markdown: HTMLTextAreaElement, markdownOutput: HTMLTextAreaElement){
    if(markdown.value){
        markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
    }
    else{
        markdownOutput.innerHTML = "<p></p>";
    }
}
}

export enum TagType {
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule
}

export class TagTypeToHtml{
    private readonly tagTypeToHtml: Map<TagType, string> = new Map<TagType, string>();
    constructor(){
        this.tagTypeToHtml.set(TagType.Paragraph, "p");
        this.tagTypeToHtml.set(TagType.Header1, "h1");
        this.tagTypeToHtml.set(TagType.Header2, "h2");
        this.tagTypeToHtml.set(TagType.Header3, "h3");
        this.tagTypeToHtml.set(TagType.HorizontalRule, "hr");
    }

    private getTag(tagType: TagType, openingTagPattern: string) : string{
        let tag = this.tagTypeToHtml.get(tagType);
        if(tag !== null){
            return openingTagPattern + tag + ">"
        }
        else{
            return openingTagPattern + "p>"
        }
    }
    public openingTag(tagType: TagType): string{
        return this.getTag(tagType, "<");
    }

    public closingTag(tagType: TagType): string{
        return this.getTag(tagType, "</");
    }
}

interface IMarkdownDocument {
    Add(...content : string[]) : void;
    Get() : string;
}

export class MarkdownDocument implements IMarkdownDocument{
    private content: string = "";
    Add(...content : string[]) : void{
        content.forEach(element => {
            this.content += element;
        })
    }
    Get() : string {
        return this.content;
    }

}

class ParseElement {
 CurrentLine: string = "";
}

interface IVisitor {
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument) : void;
}

interface IVisitable{
    Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument) : void;
}

abstract class VisitorBase implements IVisitor{
    constructor (private readonly tagType: TagType, private readonly tagTypeToHtml: TagTypeToHtml){};
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void{
        markdownDocument.Add(this.tagTypeToHtml.openingTag(this.tagType), token.CurrentLine, this.tagTypeToHtml.closingTag(this.tagType))
    }
}

class Header1Visitor extends VisitorBase{
    constructor(){
        super(TagType.Header1, new TagTypeToHtml());
    }
}

class Header2Visitor extends VisitorBase{
    constructor(){
        super(TagType.Header2, new TagTypeToHtml());
    }
}

class Header3Visitor extends VisitorBase{
    constructor(){
        super(TagType.Header3, new TagTypeToHtml());
    }
}


class ParagraphVisitor extends VisitorBase{
    constructor(){
        super(TagType.Paragraph, new TagTypeToHtml());
    }
}


class HorizontalRuleVisitor extends VisitorBase{
    constructor(){
        super(TagType.HorizontalRule, new TagTypeToHtml());
    }
}

class Visitable implements IVisitable {
    Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void {
        visitor.Visit(token, markdownDocument);
    }
}

abstract class  Handler<T> {
    protected next: Handler<T> | null = null;
    public SetNext(next: Handler<T>) :void {
        this.next = next;
    }
    public HandleRequest(request : T) : void{
        if (!this.CanHandle(request)){
            if(this.next !== null){
                this.next.HandleRequest(request);
            }
            return;
        }
    }
    protected abstract CanHandle(request : T) : boolean;
}

class ParseChainHandler extends Handler<ParseElement>{
    private readonly visitable: IVisitable = new Visitable();
    constructor (private readonly document: IMarkdownDocument,
        private readonly tagType: string,
        private readonly visitor: IVisitor){
            super();
        }
    
    protected CanHandle(request: ParseElement): boolean{
        let split = new LineParser().Parse(request.CurrentLine, this.tagType);
        if(split[0]){
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0]
    
    }
}


class ParagraphChainHandler extends Handler<ParseElement>{
    private readonly visitable: IVisitable = new Visitable();
    private readonly visitor: IVisitor = new ParagraphVisitor();
    constructor (private readonly document: IMarkdownDocument){
            super();
        }
    
    protected CanHandle(request: ParseElement): boolean{
        this.visitable.Accept(this.visitor, request, this.document);    
        return true
    }
}

class LineParser{
    public Parse(value: string, tag: string): [boolean, string]{
        let output: [boolean, string] = [false, ""];
        output[1] = value;
        if(value === ""){
            return output;
        }
        let split = value.startsWith(tag);
        if(split){
            output = [true, value.substring(tag.length)]
        }
        return output;
    }
}

class Header1ChainHandler extends ParseChainHandler{
    constructor(document: IMarkdownDocument){
        super(document, "#", new Header1Visitor())
    }
}

class Header2ChainHandler extends ParseChainHandler{
    constructor(document: IMarkdownDocument){
        super(document, "##", new Header2Visitor())
    }
}

class Header3ChainHandler extends ParseChainHandler{
    constructor(document: IMarkdownDocument){
        super(document, "###", new Header3Visitor())
    }
}

class HorizontalRuleHandler extends ParseChainHandler{
    constructor(document: IMarkdownDocument){
        super(document, "---", new HorizontalRuleVisitor())
    }
}

class ChainOfResponsabilityFactory{
    Build(document: IMarkdownDocument): ParseChainHandler{
        let header1: Header1ChainHandler = new Header1ChainHandler(document);
        let header2: Header2ChainHandler = new Header2ChainHandler(document);
        let header3: Header3ChainHandler = new Header3ChainHandler(document);
        let horizontalRule: HorizontalRuleHandler = new HorizontalRuleHandler(document);
        let paragraph: ParagraphChainHandler = new ParagraphChainHandler(document);

        header3.SetNext(header2);
        header2.SetNext(header1);
        header1.SetNext(horizontalRule);
        horizontalRule.SetNext(paragraph);
        
        return header3; 
    }
}

class MarkDown{
    public ToHtml(text: string) : string {
        let document: IMarkdownDocument = new MarkdownDocument()
        let header3 : Header1ChainHandler = new ChainOfResponsabilityFactory().Build(document);
        let lines : string[] = text.split("\n");
        for(let line of lines){
            let parseElement : ParseElement = new ParseElement();
            parseElement.CurrentLine = line;
            header3.HandleRequest(parseElement);
        }
        return document.Get();
    }
}