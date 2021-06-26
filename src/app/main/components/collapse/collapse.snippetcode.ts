import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeDefaultCollapset: snippetCode = {
  html: `
<div class="card-body collapse-icon">
  <p class="card-text">With basic collapse you can open multiple items at a time.</p>

  <div class="collapse-default">
    <div class="card">
      <div
        (click)="isCollapsed1 = !isCollapsed1"
        [attr.aria-expanded]="!isCollapsed1"
        aria-controls="collapseExample"
        class="card-header collapse-title"
        data-toggle="collapse"
      >
        Collapse Item 1
      </div>
      <div [ngbCollapse]="isCollapsed1">
        <div class="card">
          <div class="card-body">
            Pie dragée muffin. Donut cake liquorice marzipan carrot cake topping powder candy. Sugar plum
            brownie brownie cotton candy. Tootsie roll cotton candy pudding bonbon chocolate cake lemon
            drops candy. Jelly marshmallow chocolate cake carrot cake bear claw ice cream chocolate.
            Fruitcake apple pie pudding jelly beans pie candy canes candy canes jelly-o. Tiramisu brownie
            gummi bears soufflé dessert cake.
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div
        (click)="isCollapsed2 = !isCollapsed2"
        [attr.aria-expanded]="!isCollapsed2"
        aria-controls="collapseExample1"
        class="card-header collapse-title"
        data-toggle="collapse"
      >
        Collapse Item 2
      </div>
      <div [ngbCollapse]="isCollapsed2">
        <div class="card">
          <div class="card-body">
            Jelly-o brownie marshmallow soufflé I love jelly beans oat cake. I love gummies chocolate bar
            marshmallow sugar plum. Pudding carrot cake sweet roll marzipan I love jujubes. Sweet roll tart
            sugar plum halvah donut. Cake gingerbread tart. Tootsie roll soufflé danish powder marshmallow
            sugar plum halvah sweet chocolate bar. Jujubes cupcake I love toffee biscuit.
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div
        (click)="isCollapsed3 = !isCollapsed3"
        [attr.aria-expanded]="!isCollapsed3"
        aria-controls="collapseExample2"
        class="card-header collapse-title"
        data-toggle="collapse"
      >
        Collapse Item 3
      </div>
      <div [ngbCollapse]="isCollapsed3">
        <div class="card">
          <div class="card-body">
            Pudding lollipop dessert chocolate gingerbread. Cake cupcake bonbon cupcake marshmallow. Gummi
            bears carrot cake bonbon cake. Sweet roll fruitcake bear claw soufflé. Apple pie ice cream
            liquorice sesame snaps brownie. Donut marshmallow donut pudding chupa chups.
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div
        (click)="isCollapsed4 = !isCollapsed4"
        [attr.aria-expanded]="!isCollapsed4"
        aria-controls="collapseExample3"
        class="card-header collapse-title"
        data-toggle="collapse"
      >
        Collapse Item 4
      </div>
      <div id="collapseExample3" [ngbCollapse]="isCollapsed4">
        <div class="card">
          <div class="card-body">
            Brownie sweet carrot cake dragée caramels fruitcake. Gummi bears tootsie roll croissant
            gingerbread dragée tootsie roll. Cookie caramels tootsie roll pie. Sesame snaps cookie cake
            donut wafer. Wafer cookie jelly-o candy muffin cake. Marzipan topping lollipop. Gummies
            chocolate sugar plum.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  ts: `
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = false;
  public isCollapsed4 = true;
  `
};
export const snippetCodeButtonCollapse: snippetCode = {
  html: `
<button
  type="button"
  class="btn btn-outline-primary"
  (click)="isCollapsed5 = !isCollapsed5"
  [attr.aria-expanded]="!isCollapsed5"
  aria-controls="collapseExample4"
  rippleEffect
>
  Toggle
</button>
<div [ngbCollapse]="isCollapsed5">
  <div class="card mb-0">
    <div class="card-body">
      Pie drawee muffin. Donut cake liquorice marzipan carrot cake topping powder candy. Sugar plum
      brownie brownie cotton candy. Tootsie roll cotton candy pudding bonbon chocolate cake lemon drops
      candy. Jelly marshmallow chocolate cake carrot cake bear claw ice cream chocolate. Fruitcake apple
      pie pudding jelly beans pie candy canes candy canes jelly-o. Tiramisu brownie gummi bears soufflé
      dessert cake.
    </div>
  </div>
</div>
  `,
  ts: `
  public isCollapsed5 = true;
  `
};
