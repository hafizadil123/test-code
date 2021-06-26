import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeTooltipPositions: snippetCode = {
  html: `
  <button type="button" rippleEffect class="btn btn-outline-primary" tooltipClass="fadeInAnimation" placement="top"
    ngbTooltip="Tooltip on top">
    Tooltip on top
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" tooltipClass="fadeInAnimation" placement="right" container="body"
    ngbTooltip="Tooltip on right">
    Tooltip on right
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" tooltipClass="fadeInAnimation" placement="bottom"
    ngbTooltip="Tooltip on bottom">
    Tooltip on bottom
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" tooltipClass="fadeInAnimation" placement="left" container="body"
    ngbTooltip="Tooltip on left">
    Tooltip on left
  </button>
  `
};
export const snippetCodeTooltipTriggers: snippetCode = {
  html: `
  <button type="button" rippleEffect class="btn btn-outline-primary"
    ngbTooltip="Click Triggered" triggers="click:blur" tooltipClass="fadeInAnimation">
    On Click Trigger
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary"
    ngbTooltip="Hover Triggered" tooltipClass="fadeInAnimation">
    On Hover Trigger
  </button>

    ngbTooltip="Manual Triggered" [autoClose]="true" triggers="manual" #manualOpen="ngbTooltip" (click)="manualOpen.open()" tooltipClass="fadeInAnimation">
    On Manual Trigger
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" ngbTooltip="Manual Triggered" #manualClose="ngbTooltip" (click)="manualClose.close()" tooltipClass="fadeInAnimation">
    Click me to close a tooltip
  </button>
  `
};
export const snippetCodeTooltipOptions: snippetCode = {
  html: `
  <button type="button" rippleEffect class="btn btn-outline-primary" tooltipClass="text-uppercase fadeInAnimation" ngbTooltip="Text in Uppercase">
    Click to toggle
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary delay" ngbTooltip="You see, I show up after 300ms and disappear after 500ms!" [openDelay]="300" [closeDelay]="500" tooltipClass="fadeInAnimation">
  Hover 300ms here
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary delay" ngbTooltip="Disabled animation!">
  CLick to toggle
  </button>
  `
};
export const snippetCodeTooltipMethods: snippetCode = {
  html: `
    <button type="button" rippleEffect class="btn btn-outline-primary"
      ngbTooltip="Show Method Tooltip" triggers="manual" #methodOpen="ngbTooltip" (click)="methodOpen.open()" tooltipClass="fadeInAnimation">
      Show Method <span [data-feather]="'play-circle'" class="'ml-1'"></span>
    </button>

    <button type="button" rippleEffect class="btn btn-outline-primary" #methodClose="ngbTooltip" (click)="methodClose.close()"
      ngbTooltip="Hide Method Tooltip" tooltipClass="fadeInAnimation">
      Hide Method <span [data-feather]="'play-circle'" class="'ml-1'"></span>
    </button>

    <button type="button" rippleEffect class="btn btn-outline-primary" triggers="manual" #methodToggle="ngbTooltip" (click)="methodToggle.toggle()"
      ngbTooltip="Toggle Method Tooltip" tooltipClass="fadeInAnimation">
      Toggle Method <span [data-feather]="'play-circle'" class="'ml-1'"></span>
    </button>

    <div class="btn-group">
      <button type="button" rippleEffect class="btn btn-outline-primary" triggers="click" #methodIsOpen="ngbTooltip" (click)="methodIsOpen.isOpen()"
        ngbTooltip="Dispose Method Tooltip" tooltipClass="fadeInAnimation">
        Toolip is : {{ methodIsOpen.isOpen() }}
      </button>
      <button type="button" rippleEffect class="btn btn-outline-primary">
        <span [data-feather]="'play-circle'"></span>
      </button>
    </div>
  `
};
export const snippetCodeTooltipEvents: snippetCode = {
  html: `
  <button type="button" rippleEffect class="btn btn-outline-primary" ngbTooltip="Tooltip Open Event" triggers="manual" #OpenEvent="ngbTooltip" (click)="openEvent()" tooltipClass="fadeInAnimation">
    Open Event Tooltip
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" ngbTooltip="Tooltip Open Event" triggers="manual" #OpenEventAfter="ngbTooltip" (click)="openEventAfter()" tooltipClass="fadeInAnimation">
    Open Event Tooltip
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary" ngbTooltip="Tooltip Show Event" #CloseEvent="ngbTooltip" (click)="closeEvent()" tooltipClass="fadeInAnimation">
    Close Event Tooltip
  </button>

  <button type="button" rippleEffect class="btn btn-outline-primary"  ngbTooltip="Tooltip Show Event" #CloseEventAfter="ngbTooltip" (click)="closeEventAfter()" tooltipClass="fadeInAnimation">
    Closed Event Tooltip
  </button>
  `,
  ts: `
  @ViewChild('OpenEvent') OpenEvent;
  @ViewChild('OpenEventAfter') OpenEventAfter;
  @ViewChild('CloseEvent') CloseEvent;
  @ViewChild('CloseEventAfter') CloseEventAfter;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  openEvent() {
    alert('Open event!');
    this.OpenEvent.open();
  }

  openEventAfter() {
    setTimeout(() => {
      alert('Opened After event!');
    }, 300);
    this.OpenEventAfter.open();
  }

  closeEvent() {
    alert('Close event!');
    this.CloseEvent.close();
  }

  closeEventAfter() {
    setTimeout(() => {
      alert('Closed After event!');
    }, 300);
    this.CloseEventAfter.close();
  }
  `
};
