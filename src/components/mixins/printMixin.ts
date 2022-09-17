import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Mixin} from 'vue-mixin-decorator';

@Mixin
export default class PrintMixin extends Vue {
    printReport(elementId: string) {
        // Get HTML to print from element
        const prtHtml = document.getElementById(`${elementId}`)?.innerHTML;

        // Get all stylesheets HTML
        let stylesHtml = '';
        for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML;
        }

        // Open the print window
        const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

        WinPrint?.document.write(`<!DOCTYPE html>
      <html>
        <head>
          <style>
            @media print {
              @page { margin: 0 auto; }
              body { margin: 1.6cm; }
              div { break-inside: avoid;  }
              .pagebreak { page-break-before: always; }               
            }
          </style>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

        WinPrint?.document.close();
        WinPrint?.focus();
        WinPrint?.print();
        WinPrint?.close();
    }
}