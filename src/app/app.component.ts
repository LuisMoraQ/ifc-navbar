import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import Stats from 'stats.js';
import * as CUI from '@thatopen/ui-obc';
import * as OBCF from '@thatopen/components-front';
import * as BUI from '@thatopen/ui';
import { IfcAPI } from 'web-ifc';
import { html, LitElement } from 'lit';
import { render } from 'lit-html';
import { IfcRelContainedInSpatialStructure } from './interfaces';


interface IfcObject {
  GlobalId: string;
  Name: string;
  ObjectPlacement: Handle;
  Representation: Handle;
}

// Definimos una interfaz para representar un Handle, que es un identificador en el sistema
interface Handle {
  value: number;
  type: number;
}

// Definimos la estructura para la geometría 3D
interface ThreeDGeometry {
  uuid: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material[];
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

interface Elemento {
  informacion: any;
  active: boolean;
  nivel: any;
  clase: string;
  claseTraducida: string;
  mostrar: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnChanges {
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
  dataElement: any = {};
  grupos: any;
  mostrarNavbar = true;
  dataIFC: Elemento[] = [];
  filaSel: any = null;
  arrayCompleto: any[] = [];
  items: any;
  childrens: any;
  meshes: any

  constructor() {}
  ngOnChanges() {}

  async ngAfterViewInit() {
    this.world = this.worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();
    this.fragmentIfcLoader = await this.components.get(OBC.IfcLoader);
    const fragments = await this.components.get(OBC.FragmentsManager);
    console.log('fragments', fragments)
   

    await this.fragmentIfcLoader.setup();
    await this.components.init();
    this.world.scene = new OBC.SimpleScene(this.components);
    this.world.renderer = new OBC.SimpleRenderer(
      this.components,
      this.containerRef.nativeElement
    );
    this.world.camera = new OBC.SimpleCamera(this.components);
    this.world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
    this.initializeScene();
    this.fragmentIfcLoader.settings.wasm = {
      path: 'https://unpkg.com/web-ifc@0.0.65/',
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

    if (fragments.groups.size) {
      await this.crearTabla(fragments);
    }
    await this.animate();
    console.log('fragments', fragments);
    this.meshes= fragments.meshes
    console.log('meshes',this.meshes)
    // const group: any = Array.from(fragments.groups.values())[0];
    // const properties = group.getLocalProperties();
    // console.log('properties', properties)
    // if (properties && typeof properties === 'object') {
    //   for (const mesh of this.meshes) {
    //     console.log('Mesh encontrado:', mesh);
  
    //     if (mesh instanceof THREE.Mesh) {
    //       // Acceder a la geometría y el material
    //       const geometry = mesh.geometry;
    //       const material = mesh.material;
  
    //       // Ejemplo: Acceder a los vértices de la geometría
    //       if (geometry instanceof THREE.BufferGeometry) {
    //         console.log('geometry', geometry)
    //         console.log('material', material)
    //         const positions = geometry.attributes.position.array;
    //         console.log('Vértices:', positions);
  
    //         const meshID = mesh.uuid;  // Utilizando un identificador único del mesh
    //         // Comprobar si las propiedades existen para este mesh
    //         if (properties.hasOwnProperty(meshID)) {
    //           const propiedadesMesh = properties[meshID];
    //           console.log('Propiedades asociadas al mesh:', propiedadesMesh);
  
    //           // Procesar las propiedades
    //           for (const key in propiedadesMesh) {
    //             if (propiedadesMesh.hasOwnProperty(key)) {
    //               const value = propiedadesMesh[key];
    //               console.log(`Propiedad con clave ${key}:`, value);
    //             }
    //           }
    //         } else {
    //           console.log(`No hay propiedades asociadas al mesh con ID ${meshID}`);
    //         }
  
    //         // Procesar la geometría o material si es necesario
    //       }
    //     }
    //   }
    // } else {
    //   console.error('Las propiedades no son un objeto válido.');
    // }
    console.log('fragmentIfcLoader', this.fragmentIfcLoader)
  }

  async crearTabla(fragments: any) {
    let proyecto: Elemento[] = [];
    const group: any = Array.from(fragments.groups.values())[0];
    console.log('group', group);
    this.items = group.items;
    this.childrens = group.children;
    const properties = group.getLocalProperties();
    const arrayCompleto: any[] = [];
    const propertiesArray = Object.values(properties);
    propertiesArray.forEach((ele: any) => (arrayCompleto[ele.expressID] = ele));
    this.arrayCompleto = arrayCompleto;
    const project: Elemento = {
      active: true,
      clase: 'IfcProject',
      claseTraducida: 'Proyecto',
      informacion: propertiesArray.find(
        (ele: any) => ele.constructor.name == 'IfcProject'
      ),
      mostrar: true,
      nivel: 0,
    };
    proyecto.push(project);
    const site: Elemento = {
      active: true,
      clase: 'IfcSite',
      claseTraducida: 'Sitio',
      informacion: propertiesArray.find(
        (ele: any) => ele.constructor.name == 'IfcSite'
      ),
      mostrar: true,
      nivel: 1,
    };
    proyecto.push(site);
    const building: Elemento = {
      active: true,
      clase: 'IfcBuilding',
      claseTraducida: 'Edificio',
      informacion: propertiesArray.find(
        (ele: any) => ele.constructor.name == 'IfcBuilding'
      ),
      mostrar: true,
      nivel: 2,
    };
    proyecto.push(building);
    const contenedores: any[] = propertiesArray.filter(
      (ele: any) => ele.constructor.name == 'IfcRelContainedInSpatialStructure'
    );
    for (const element of contenedores) {
      let elementos: any = [];
      let informacion: any = null;
      if (element.RelatedElements && element.RelatedElements.length) {
        let elefiltrado: any[] = [];
        element.RelatedElements.map((ele: any) => {
          const filtrados = propertiesArray
            .filter((data: any) => data.expressID === ele.value)
            .map((data: any) => {
              // Mapea los elementos filtrados y agrega las nuevas propiedades
              return {
                active: true,
                clase: data.constructor.name,
                informacion: data,
                nivel: 5,
                mostrar: false,
              };
            });
          elefiltrado = elefiltrado.concat(filtrados);
        });
        elefiltrado.sort((a: any, b: any) => {
          if (a.clase < b.clase) {
            return -1;
          }
          if (a.clase > b.clase) {
            return 1;
          }
          return 0;
        });
        const result: any = [];
        let currentConstructorName: any = null;
        elefiltrado.forEach((item: any) => {
          if (item.clase !== currentConstructorName) {
            const ob: Elemento = {
              active: true,
              clase: item.clase,
              informacion: '',
              nivel: 4,
              claseTraducida: '',
              mostrar: false,
            };
            result.push(ob);
            currentConstructorName = item.clase;
          }
          result.push(item);
        });
        elementos = elementos.concat(result);
      }
      if (element.RelatingStructure) {
        // const info = propertiesArray.find(
        //   (data: any) => data.expressID == element.RelatingStructure.value
        // );
        // informacion = info;
        informacion = arrayCompleto[element.RelatingStructure.value];
      }
      const obj: Elemento = {
        active: true,
        informacion: informacion,
        clase: informacion.constructor.name,
        nivel: 3,
        claseTraducida: '',
        mostrar: true,
      };
      proyecto.push(obj);
      proyecto = proyecto.concat(elementos);
    }

    const diccionarioTraduccion: { [key: string]: string } = {
      IfcWall: 'Pared',
      IfcBuildingStorey: 'Piso de Edificio',
      IfcDoor: 'Puerta',
      IfcColumn: 'Pilar',
      IfcWindow: 'Ventana',
      IfcRoof: 'Cubierta',
      IfcSlab: 'Forjado',
      IfcBeam: 'Viga',
      IfcSpace: 'Espacio',
      IfcWallStandardCase: 'Muro Estándar',
      IfcBuildingElementProxy: 'Elemento constructivo indeterminado(Proxy)',
      IfcCurtainWall: 'Muro Entramado',
      IfcFlowTerminal: 'Terminal de Flujo',
      IfcFurnishingElement: 'Elemento de Mobiliario',
      IfcGrid: 'Eje',
      IfcStair: 'Escalera',
      IfcMaterialList: 'Lista de Materiales',
      IfcCovering: 'Revestimiento',
    };
    const diccionarioTraduccion2: { [key: string]: string } = {
      IfcWall: 'Pared',
      IfcBuildingStorey: 'Piso de Edificio',
      IfcDoor: 'Puertas',
      IfcColumn: 'Pilares',
      IfcWindow: 'Ventanas',
      IfcRoof: 'Cubiertas',
      IfcSlab: 'Cimientos',
      IfcBeam: 'Vigas',
      IfcSpace: 'Espacios',
      IfcWallStandardCase: 'Muros',
      IfcBuildingElementProxy:
        'Elementos constructivos indeterminados(Proxies)',
      IfcCurtainWall: 'Muros Entramados',
      IfcFlowTerminal: 'Otros',
      IfcFurnishingElement: 'Muebles',
      IfcGrid: 'Rejillas',
      IfcStair: 'Escaleras',
      IfcMaterialList: 'Lista de Materiales',
      IfcCovering: 'Revestimientos',
    };

    proyecto.forEach((elemento) => {
      if (elemento.nivel > 2) {
        const claseOriginal = elemento.clase;
        let claseTraducida;
        if (elemento.nivel !== 4) {
          claseTraducida =
            diccionarioTraduccion[claseOriginal] || elemento.clase;
        } else {
          claseTraducida =
            diccionarioTraduccion2[claseOriginal] || elemento.clase;
        }
        elemento.claseTraducida = claseTraducida;
      }
    });
    this.dataIFC = proyecto;
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

 

  async seleccionRow(row: Elemento, index: number) {
    if (index == this.filaSel) {
      return;
    }
    this.filaSel = index;
    if (row.informacion.Representation) {
      if (Array.isArray(row.informacion.Representation)) {
        for (const element of row.informacion.Representation) {
          const encontrado = this.arrayCompleto[element.value];
          console.log('array', encontrado);
        }
      } else if (typeof row.informacion.Representation == 'object') {
        console.log('ind', row.informacion.Representation.value);
        console.log('row', row.informacion);
        console.log('meshes',row.informacion.GlobalId.value);
        console.log('meshes', this.meshes);
        const encontrado = await this.meshes.find((ele:any) => ele.uuid == row.informacion.GlobalId.value)
        // const respuesta = await this.prueba(row.informacion.Representation, row.informacion)
        console.log('encontrado', encontrado)
      } else {
        console.log('no tiene respresentacion');
      }
    }
  }

  async prueba(handle: any, ifcObject: any): Promise<ThreeDGeometry | undefined> {
    const ifcTo3DMap: Map<number, ThreeDGeometry> = new Map();
  
    // Función para obtener la geometría asociada con el objeto IFC desde el mapa
    function getRepresentationFromIfc(handle: any): ThreeDGeometry | undefined {
      return ifcTo3DMap.get(handle.value);
    }
  
    // Función para asociar la geometría 3D con el objeto IFC
    function associateIfcWith3DObject(ifcObject: any, geometry: ThreeDGeometry): void {
      const { Representation } = ifcObject;
      ifcTo3DMap.set(Representation.value, geometry);
      console.log(`La representación del objeto IFC con GlobalId ${ifcObject.GlobalId} se ha asociado con la geometría 3D.`);
    }
  
    // Suponemos que handle.value es el identificador para la representación
    const representationHandle = handle.value;
    
    // Convertimos la representación del IFC en un objeto 3D (geometría) aquí
    // Esta función debe convertir la geometría del IFC a un formato comprensible por Three.js
    const geometry = await this.convertIfcToThreeGeometry(representationHandle);
  
    if (geometry) {
      // Asociamos la geometría con el objeto IFC
      associateIfcWith3DObject(ifcObject, geometry);
  
      // Retornamos la geometría asociada con el handle
      const associatedGeometry = getRepresentationFromIfc(handle);
      if (associatedGeometry) {
        console.log('Geometría encontrada para el objeto IFC:', associatedGeometry);
        return associatedGeometry;
      } else {
        console.log('No se encontró geometría para el objeto IFC.');
        return undefined;
      }
    } else {
      console.log('No se encontró geometría para la representación');
      return undefined;
    }
  }
  
  // Función auxiliar para convertir la representación IFC a geometría de Three.js
  async  convertIfcToThreeGeometry(handle: any): Promise<ThreeDGeometry | null> {
    // Esta función debe implementarse para convertir los datos del IFC en geometría de Three.js.
    // Necesitarás extraer las coordenadas y otros datos del IFC para crear el objeto Geometry adecuado para Three.js.
  
    // Ejemplo de geometría de caja: reemplaza esto con la conversión real
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  
    return {
      uuid: handle,
      geometry: geometry,
      material: [material],
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
    };
  }
  
  toggleNavbar() {
    this.mostrarNavbar = !this.mostrarNavbar;
  }

  toggleRow(index: number, accion: boolean) {
    const seleccionado = this.dataIFC[index].nivel;
    this.dataIFC[index].active = !this.dataIFC[index].active;
    for (let i = index + 1; i < this.dataIFC.length; i++) {
      let element = this.dataIFC[i];

      if (seleccionado !== element.nivel) {
        if (accion) {
          if (element.nivel == seleccionado + 1) {
            this.dataIFC[i].mostrar = accion;
          } else {
            console.log('b');
          }
        } else {
          this.dataIFC[i].mostrar = accion;
        }
      } else {
        break;
      }
    }
  }


  // async crearTabla(dataTabla: Elemento[]) {
  //   BUI.Manager.init();

  //   //   const propertiesPanel = BUI.Component.create(() => {
  //   //     return BUI.html`
  //   //      <bim-panel label="Propiedades">
  //   //       <bim-panel-section label="Datos del Elemento">
  //   //         <table>
  //   //           <thead>
  //   //             <tr>
  //   //               <th class="propertiesPanel">Activo</th>
  //   //               <th class="propertiesPanel">Tipo</th>
  //   //               <th class="propertiesPanel">Elemento</th>
  //   //               <th class="propertiesPanel">Descripción</th>
  //   //             </tr>
  //   //           </thead>
  //   //           <tbody>
  //   //             ${dataTabla.map(
  //   //               (o, index) => BUI.html`
  //   //                 <tr id="row-${index}">
  //   //                   <td class="propertiesPanel" style="text-align:center">
  //   //                     <input type="checkbox" ${o.active ? 'checked' : ''} />
  //   //                   </td>
  //   //                   <td class="propertiesPanel">
  //   //                     ${o.claseTraducida}
  //   //                     <!-- Botón de toggle en la columna Tipo -->
  //   //                     <button class="toggle-btn" onclick="toggleRow(${index})">
  //   //                       ${o.mostrar ? 'Mostrar' : 'Ocultar'}
  //   //                     </button>
  //   //                   </td>
  //   //                   <td class="propertiesPanel">
  //   //                     ${o.informacion?.Name?.value}
  //   //                   </td>
  //   //                   <td class="propertiesPanel">
  //   //                     <!-- Descripción vacía -->
  //   //                   </td>
  //   //                 </tr>
  //   //                 <!-- Nivel inferior oculto -->
  //   //                 ${
  //   //                   o.mostrar
  //   //                     ? ''
  //   //                     : BUI.html`
  //   //                   <tr class="nested-row" id="nested-row-${index}">
  //   //                     <td colspan="4">
  //   //                       <!-- Contenido de la fila de nivel inferior -->
  //   //                       Este es un nivel inferior con más detalles de ${o.claseTraducida}.
  //   //                     </td>
  //   //                   </tr>
  //   //                 `
  //   //                 }
  //   //               `
  //   //             )}
  //   //           </tbody>
  //   //         </table>
  //   //       </bim-panel-section>
  //   //     </bim-panel>
  //   //     <script>
  //   //       function toggleRow(index) {
  //   //         // Obtiene el objeto de datos de la fila correspondiente
  //   //         const item = dataTabla[index];

  //   //         // Alterna el estado de visibilidad (isHidden)
  //   //         item.isHidden = !item.isHidden;

  //   //         // Actualiza el contenido de la tabla
  //   //         renderTable();
  //   //       }

  //   //       function renderTable() {
  //   //         // Este es el método para volver a renderizar la tabla con los datos actualizados
  //   //         // Deberías agregar este método a tu lógica de actualización de UI.
  //   //       }
  //   // </script>
  //   //     `;

  //   //     // function toggleRow(index: number) {
  //   //     //   // Obtiene el objeto de datos de la fila correspondiente
  //   //     //   const item = dataTabla[index];

  //   //     //   // Alterna el estado de visibilidad (isHidden)
  //   //     //   item.mostrar = !item.mostrar;

  //   //     //   // Actualiza el contenido de la tabla
  //   //     //   renderTable();
  //   //     // }

  //   //     // function renderTable() {
  //   //     //   // Este es el método para volver a renderizar la tabla con los datos actualizados
  //   //     //   // Deberías agregar este método a tu lógica de actualización de UI.
  //   //     // }

  //   //     // Función recursiva para renderizar los items dentro de cada subgrupo
  //   //   });

  //   const propertiesPanel = BUI.Component.create(() => {
  //     function toggleRow(index: number) {
  //       console.log('toggleRow', index)
  //       // Obtiene el objeto de datos de la fila correspondiente
  //       const item = dataTabla[index];

  //       // Alterna el estado de visibilidad del nivel inferior (mostrar/ocultar)
  //       // item.mostrar = !item.mostrar;
  //       let filtrados = []
  //       for (let i = index + 1; i < dataTabla.length; i++) {
  //         const element = dataTabla[i];
  //         if (element.nivel > item.nivel) {
  //           element.mostrar = true
  //           filtrados.push(element)
  //         } else {
  //           break
  //         }
  //       }
  //       console.log('filtrados', filtrados)
  //       updateTable();
  //     }
  //     function updateTable() {
  //       console.log('tableBopropertiesPaneldy', propertiesPanel)
  //       const tableBody = propertiesPanel.querySelector('tbody');
  //       if (tableBody) {
  //         tableBody.innerHTML = '';
  //         const rows = dataTabla
  //   .filter((o) => o.mostrar)  // Filter rows where 'mostrar' is true
  //   .map((o, index) => {
  //     return BUI.html`
  //       <tr id="row-${index}">
  //         <td class="propertiesPanel" style="text-align:center">
  //           <input type="checkbox" ${o.active ? 'checked' : ''} />
  //         </td>
  //         <td class="propertiesPanel">
  //           ${
  //             o.nivel !== null
  //               ? BUI.html`
  //                 <button class="toggle-btn" data-index="${index}">
  //                   ${o.mostrar ? '+' : '-'}
  //                 </button>
  //               `
  //               : ''
  //           }
  //           ${o.claseTraducida}
  //         </td>
  //         <td class="propertiesPanel">
  //           ${o.informacion?.Name?.value}
  //         </td>
  //         <td class="propertiesPanel">
  //           <!-- Descripción vacía -->
  //         </td>
  //       </tr>
  //     `;
  //   });

  // // Use render to insert all rows at once
  // render(BUI.html`${rows}`, tableBody);
  //         const buttons = propertiesPanel.querySelectorAll('.toggle-btn');
  //         buttons.forEach((button: any) => {
  //           const index = parseInt(button.getAttribute('data-index')!, 10);
  //           button.addEventListener('click', () => toggleRow(index));
  //         });
  //       }
  //     }
  //     const a = BUI.html`
  //    <bim-panel label="Propiedades">
  //       <bim-panel-section label="Datos del Elemento">
  //         <table>
  //           <thead>
  //             <tr>
  //               <th class="propertiesPanel">Activo</th>
  //               <th class="propertiesPanel">Tipo</th>
  //               <th class="propertiesPanel">Elemento</th>
  //               <th class="propertiesPanel">Descripción</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${dataTabla.map((o, index) => {
  //               if (!o.mostrar) return null; // Si 'o.mostrar' es false, no mostramos la fila
  //               return BUI.html`
  //                 <tr id="row-${index}">
  //                   <td class="propertiesPanel" style="text-align:center">
  //                     <input type="checkbox" ${o.active ? 'checked' : ''} />
  //                   </td>
  //                   <td class="propertiesPanel">
  //                     <!-- Botón de toggle en la columna Tipo -->
  //                     ${
  //                       o.nivel !== null
  //                         ? BUI.html`
  //                         <button class="toggle-btn" data-index="${index}">
  //                           ${o.mostrar ? '+' : '-'}
  //                         </button>
  //                       `
  //                         : ''
  //                     }
  //                     ${o.claseTraducida}
  //                   </td>
  //                   <td class="propertiesPanel">
  //                     ${o.informacion?.Name?.value}
  //                   </td>
  //                   <td class="propertiesPanel">
  //                     <!-- Descripción vacía -->
  //                   </td>
  //                 </tr>

  //               `;
  //             })}
  //           </tbody>
  //         </table>
  //       </bim-panel-section>
  //     </bim-panel>
  // `;
  //     setTimeout(() => {
  //       const buttons = propertiesPanel.querySelectorAll('.toggle-btn');
  //       buttons.forEach((button: any) => {
  //         const index = parseInt(button.getAttribute('data-index')!, 10);
  //         button.addEventListener('click', () => toggleRow(index));
  //       });
  //     }, 0);
  //     return a;
  //   });

  //   console.log('propertiesPanel', propertiesPanel);
  //   const viewport = document.createElement('div');
  //   const app = document.createElement('bim-grid');
  //   app.layouts = {
  //     main: {
  //       template: `
  //         "propertiesPanel viewport"
  //         /25rem 1fr
  //       `,
  //       elements: { propertiesPanel, viewport },
  //     },
  //   };

  //   // Configura el layout del app
  //   const container = this.containerRef.nativeElement;
  //   app.layout = 'main';
  //   container.append(app);
  // }

  // private extractPropertiesData(data: any) {
  //   let result: any = [];
  //   for (let key in data) {
  //     if (data[key] && data[key].COLUMN) {
  //       result = result.concat(data[key].COLUMN || []);
  //     }
  //   }
  //   return result;
  // }

  // private generarFragmentIdMap(element: any) {
  //   const keyFrag = element.id;
  //   const value = element.ids;
  //   const myObject = {
  //     [keyFrag]: value,
  //   };
  //   console.log('myObject', myObject);
  //   this.highlightFragment(myObject);
  // }

  // private highlightFragment(fragmentIdMap: any) {
  //   // Verifica que el fragmentId no sea undefined, null, o vacío
  //   const [propertiesTable, updatePropertiesTable] =
  //     CUI.tables.elementProperties({
  //       components: this.components,
  //       fragmentIdMap: {},
  //     });
  //   propertiesTable.preserveStructureOnFilter = true;
  //   propertiesTable.indentationInText = false;
  //   updatePropertiesTable({ fragmentIdMap });
  // }



  // getFragmentsFromModel(model: any): any[] {
  //   const fragments: any[] = [];
  //   if (model && model.children) {
  //     model.traverse((child: any) => {
  //       if (child.isMesh) {
  //         fragments.push(child);
  //       }
  //     });
  //   }
  //   return fragments;
  // }

  // private createPropertiesPanel() {
  //   BUI.Manager.init();
  //   const [propertiesTable, updatePropertiesTable] =
  //     CUI.tables.elementProperties({
  //       components: this.components,
  //       fragmentIdMap: {},
  //     });
  //   propertiesTable.preserveStructureOnFilter = true;
  //   propertiesTable.indentationInText = false;

  //   const highlighter = this.components.get(OBCF.Highlighter);

  //   highlighter.setup({ world: this.world });
  //   if (highlighter.events['select']) {
  //     const selectEvents = highlighter.events['select'];

  //     if (
  //       selectEvents.onHighlight &&
  //       typeof selectEvents.onHighlight.add === 'function'
  //     ) {
  //       selectEvents.onHighlight.add((fragmentIdMap: any) => {
  //         console.log('fragmentIdMap', fragmentIdMap);
  //         this.buscarElemento(fragmentIdMap);
  //         updatePropertiesTable({ fragmentIdMap });
  //       });
  //     }

  //     if (
  //       selectEvents.onClear &&
  //       typeof selectEvents.onClear.add === 'function'
  //     ) {
  //       selectEvents.onClear.add(() => {
  //         updatePropertiesTable({ fragmentIdMap: {} });
  //         this.dataElement = null;
  //       });
  //     }
  //   }

  //   const propertiesPanel = BUI.Component.create(() => {
  //     const onTextInput = (e: Event) => {
  //       const input = e.target as BUI.TextInput;
  //       propertiesTable.queryString = input.value !== '' ? input.value : null;
  //     };

  //     const expandTable = (e: Event) => {
  //       const button = e.target as BUI.Button;
  //       propertiesTable.expanded = !propertiesTable.expanded;
  //       button.label = propertiesTable.expanded ? 'Ocultar' : 'Expandir';
  //     };

  //     const copyAsTSV = async () => {
  //       try {
  //         await navigator.clipboard.writeText(propertiesTable.tsv);
  //         console.log('propertiesTable.tsv', propertiesTable.tsv);
  //         console.log('TSV copiado en clipboard');
  //       } catch (error) {
  //         console.error('Error al copiar TSV:', error);
  //       }
  //     };

  //     return BUI.html`
  //       <bim-panel label="Propiedades">
  //         <bim-panel-section label="Datos del Elemento">
  //           <div style="display: flex; gap: 0.5rem;">
  //             <bim-button @click=${expandTable} label=${
  //       propertiesTable.expanded ? 'Ocultar' : 'Expandir'
  //     }></bim-button>
  //             <bim-button @click=${copyAsTSV} label="Copiar"></bim-button>
  //           </div>
  //           <bim-text-input @input=${onTextInput} placeholder="Buscar Propiedad" debounce="250"></bim-text-input>
  //           ${propertiesTable}let
  //         </bim-panel-section>
  //       </bim-panel>
  //     `;
  //   });

  //   const viewport = document.createElement('div');
  //   const app = document.createElement('bim-grid');
  //   app.layouts = {
  //     main: {
  //       template: `
  //         "propertiesPanel viewport"
  //         /25rem 1fr
  //       `,
  //       elements: { propertiesPanel, viewport },
  //     },
  //   };

  //   // Configura el layout del app
  //   const container = this.containerRef.nativeElement;
  //   app.layout = 'main';
  //   container.append(app);
  // }

  // private buscarElemento(fragmento: any) {
  //   console.log(fragmento);
  //   console.log(this.grupos);

  //   const clave = Object.keys(fragmento)[0];
  //   console.log('clave', clave);
  //   const encontrado = this.grupos.items.find((ele: any) => ele.id == clave);
  //   console.log('encontrado', encontrado);
  //   // const objeto =  encontrado.getLocalProperties()
  //   //  console.log('objeto', objeto)
  // }
  
}
