import { Button, dom, Component, Element as El, Modal } from '../ui';
import permalink from '../permalink/permalink';

const ShareMap = function ShareMap(options = {}) {
  let {
    target
  } = options;

  const {
    localization
  } = options;
  function localize(key) {
    return localization.getStringByKeys({ targetParentKey: 'sharemap', targetKey: key });
  }
  
  const {
    icon = '#ic_screen_share_outline_24px',
    title = localize('title'),
    placement = ['menu'],
    storeMethod,
    serviceEndpoint
  } = options;
  let viewer;
  let mapMenu;
  let menuItem;
  let modal;
  let mapTools;
  let screenButtonContainer;
  let screenButton;

  const createContent = function createContent() { // Kopiera och klistra in länken för att dela kartan.
    const shareMapInstruction = localize('shareMapInstruction');
    return `<div class="o-share-link"><input type="text"></div><i>${shareMapInstruction}</i>`;
  };

  const createLink = function createLink(data) {
    const url = permalink.getPermalink(viewer, data);
    const inputElement = document.getElementsByClassName('o-share-link')[0].firstElementChild;

    inputElement.value = url;
    inputElement.select();
  };

  const determineLinkType = function () {
    if (storeMethod === 'saveStateToServer') {
      permalink.saveStateToServer(viewer).then((data) => {
        createLink(data);
      });
    } else {
      createLink();
    }
  };

  return Component({
    name: 'sharemap',
    addParamsToGetMapState(key, callback) {
      permalink.addParamsToGetMapState(key, callback);
    },
    onInit() {
      if (storeMethod && serviceEndpoint) {
        permalink.setSaveOnServerServiceEndpoint(serviceEndpoint);
      }
    },
    onAdd(evt) {
      viewer = evt.target;
      target = viewer.getId();
      if (placement.indexOf('screen') > -1) {
        mapTools = `${viewer.getMain().getMapTools().getId()}`;
        screenButtonContainer = El({
          tagName: 'div',
          cls: 'flex column'
        });
        screenButton = Button({
          cls: 'o-link padding-small icon-smaller round light box-shadow',
          click() {
            modal = Modal({
              title: localize('linkToMap'),
              content: createContent(),
              target
            });
            this.addComponent(modal);
            determineLinkType()

          },
          icon,
          tooltipText: title,
          tooltipPlacement: 'east'
        });
        this.addComponent(screenButton);
      }

      if (placement.indexOf('menu') > -1) {
        mapMenu = viewer.getControlByName('mapmenu');
        menuItem = mapMenu.MenuItem({
          click() {
            mapMenu.close();
            modal = Modal({
              title: localize('linkToMap'),
              content: createContent(),
              target
            });
            this.addComponent(modal);
            determineLinkType()
          },
          icon,
          title
        });
        this.addComponent(menuItem);
      }
      this.render();
    },
    render() {
      if (placement.indexOf('screen') > -1) {
        let htmlString = `${screenButtonContainer.render()}`;
        let el = dom.html(htmlString);
        document.getElementById(mapTools).appendChild(el);
        htmlString = screenButton.render();
        el = dom.html(htmlString);
        document.getElementById(screenButtonContainer.getId()).appendChild(el);
      }
      if (placement.indexOf('menu') > -1) {
        mapMenu.appendMenuItem(menuItem);
      }
      this.dispatch('render');
    }
  });
};

export default ShareMap;
