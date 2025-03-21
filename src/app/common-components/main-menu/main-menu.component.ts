import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MenuDTO } from '../../model/MenuDTO';

interface MenuDTOFlatNode {
  icon: string;
  url: string;
  id: number;
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  @Input() menuDTO: MenuDTO[] = []

  @Output() menuClicked:EventEmitter<boolean>=new EventEmitter<boolean>();

  private _transformer = (node: MenuDTO, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      id: node.id,
      url: node.url,
      level: level
    };
  };

  treeControl = new FlatTreeControl<MenuDTOFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.menuDTO;
  }

  ngOnChanges(){
    this.dataSource.data = this.menuDTO;
  }

  hasChild = (_: number, node: MenuDTOFlatNode) => node.expandable;

}
