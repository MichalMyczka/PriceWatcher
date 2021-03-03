import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.css']
})
export class TradingViewComponent implements AfterViewInit {

  // allows for loading with any symbol
  @Input() symbol = '';
  settings: any = {};
  // id for being able to check for errors using postMessage
  widgetId = '';
  // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
  @ViewChild( 'containerDiv', { static: false } ) containerDiv: ElementRef;

  constructor( private _elRef: ElementRef ) {
  }

  ngAfterViewInit(): void {
    // need to do this in AfterViewInit because of the Input
    setTimeout( () => {
      this.widgetId = `${ this.symbol }_chart`;

      // postMessage listener for handling errors
      if ( window.addEventListener ) {
        window.addEventListener( 'message', ( e: any ) => {
            if ( e && e.data ) {
              console.log( e );
              const payload = e.data;
              // if the frameElementId is from this component, the symbol was no good and we should hide the widget
              if ( payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId ) {
                this.containerDiv.nativeElement.style.display = 'none';
              }
            }
          },
          false,
        );
      }
      this.settings = {
        symbols: [
          [
            this.symbol,
          ]
        ],
        chartOnly: false,
        width: 1000,
        height: 400,
        locale: 'pl',
        colorTheme: 'dark',
        gridLineColor: 'rgba(0, 255, 0, 1)',
        trendLineColor: '#1976d2',
        fontColor: '#787b86',
        underLineColor: 'rgba(55, 166, 239, 0.15)',
        isTransparent: false,
        autosize: false,
        container_id: 'tradingview_a695c'
      };
      const script = document.createElement( 'script' );
      script.src = 'https://s3.tradingview.com/tv.js';
      script.id = this.widgetId;
      this.containerDiv.nativeElement.appendChild( script );
      const script2 = document.createElement('script' );
      script2.innerHTML = 'new TradingView.MediumWidget(' + JSON.stringify( this.settings ) + ')';
      console.log('new TradingView.MediumWidget(' + JSON.stringify( this.settings ) + ')');
      this.containerDiv.nativeElement.appendChild( script2 );
    } );
  }

}
