import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import Stats from 'stats.js';
import * as CUI from '@thatopen/ui-obc';  
import * as OBCF from '@thatopen/components-front';
import * as BUI from "@thatopen/ui";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  private components = new OBC.Components();
  private worlds = this.components.get(OBC.Worlds);
  private world!: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
  >;
  private fragmentIfcLoader!: OBC.IfcLoader;
  private stats = new Stats();

  constructor() {}

  async ngAfterViewInit() {
    this.world = this.worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();
    this.fragmentIfcLoader = this.components.get(OBC.IfcLoader);
    await this.fragmentIfcLoader.setup();
    this.components.init();
    this.world.scene = new OBC.SimpleScene(this.components);
    this.world.renderer = new OBC.SimpleRenderer(
      this.components,
      this.containerRef.nativeElement
    );
    this.world.camera = new OBC.SimpleCamera(this.components);
    this.world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
    this.initializeScene();
    this.fragmentIfcLoader.settings.wasm = {
      path: 'https://unpkg.com/web-ifc@0.0.57/',
      absolute: true,
    };
    const grids = this.components.get(OBC.Grids);

    grids.create(this.world);

    this.world.scene.three.background = null;

    this.fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

    // VISOR DE FPS   
    // document.body.appendChild(this.stats.dom);
    await this.loadIfc();
    this.world.scene.setup();
    this.createPropertiesPanel();
    await this.animate();
  }

  private initializeScene() {
    const scene = this.world.scene.three as THREE.Scene;
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
  }

  private async loadIfc() {
    try {
      const documentoUrl = 'assets/sshh.ifc';
      const file = await fetch(documentoUrl);
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      const model = await this.fragmentIfcLoader.load(buffer);
      model.name = 'example';
      if (this.world.scene.three) {
        this.world.scene.three.add(model);
        const indexer = this.components.get(OBC.IfcRelationsIndexer);
        await indexer.process(model);
      }
    } catch (error) {
      console.error('Error loading IFC file:', error);
    }
  }

  private createPropertiesPanel() {
    BUI.Manager.init()
    const [propertiesTable, updatePropertiesTable] = CUI.tables.elementProperties({
      components:this.components,
      fragmentIdMap: {},
    });
  
    propertiesTable.preserveStructureOnFilter = true;
    propertiesTable.indentationInText = false;

    const highlighter = this.components.get(OBCF.Highlighter);
    highlighter.setup({ world: this.world });
    if (highlighter.events['select']) {
      const selectEvents = highlighter.events['select'];
      if (selectEvents.onHighlight && typeof selectEvents.onHighlight.add === 'function') {
        selectEvents.onHighlight.add((fragmentIdMap: any) => {
          updatePropertiesTable({ fragmentIdMap });
        });
      }
    
      if (selectEvents.onClear && typeof selectEvents.onClear.add === 'function') {
        selectEvents.onClear.add(() => {
          updatePropertiesTable({ fragmentIdMap: {} });
        });
      }
    }
    

    const propertiesPanel = BUI.Component.create(() => {
      const onTextInput = (e: Event) => {
        const input = e.target as BUI.TextInput;
        propertiesTable.queryString = input.value !== '' ? input.value : null;
      };
    
      const expandTable = (e: Event) => {
        const button = e.target as BUI.Button;
        propertiesTable.expanded = !propertiesTable.expanded;
        button.label = propertiesTable.expanded ? 'Collapse' : 'Expand';
      };
    
      const copyAsTSV = async () => {
        try {
          await navigator.clipboard.writeText(propertiesTable.tsv);
          console.log('TSV copied to clipboard');
        } catch (error) {
          console.error('Failed to copy TSV:', error);
        }
      };
    
      return BUI.html`
        <bim-panel label="Properties">
          <bim-panel-section label="Element Data">
            <div style="display: flex; gap: 0.5rem;">
              <bim-button @click=${expandTable} label=${propertiesTable.expanded ? 'Collapse' : 'Expand'}></bim-button>
              <bim-button @click=${copyAsTSV} label="Copy as TSV"></bim-button>
            </div>
            <bim-text-input @input=${onTextInput} placeholder="Search Property" debounce="250"></bim-text-input>
            ${propertiesTable}
          </bim-panel-section>
        </bim-panel>
      `;
    });
    
    const viewport = document.createElement('div'); 
    const app = document.createElement('bim-grid');
    app.layouts = {
      main: {
        template: `
          "propertiesPanel viewport"
          /25rem 1fr 
        `,
        elements: { propertiesPanel, viewport },
      },
    };
    
    // Configura el layout del app
    const container = this.containerRef.nativeElement;
    app.layout = 'main';
    container.append(app);
    
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.stats.begin();
    this.stats.end();

    if (this.world.renderer && this.world.camera) {
      const renderer = this.world.renderer as any;
      if (renderer instanceof THREE.WebGLRenderer) {
        renderer.render(this.world.scene.three, this.world.camera.three);
      }
    }
  }
}
