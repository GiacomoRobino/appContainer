import { Component, OnInit } from '@angular/core';
import { HtmlHandler } from './MarkdownParser';
@Component({
  selector: 'app-markup-editor',
  templateUrl: './markup-editor.component.html',
  styleUrls: ['./markup-editor.component.scss']
})
export class MarkupEditorComponent implements OnInit {

  constructor() { 
  }
  ngOnInit(): void {
    new HtmlHandler().TextChangedHandler("markdown", "markdown-output");
  }

}
