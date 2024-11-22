
var preTags = document.getElementsByTagName('pre');
if (preTags.length > 0) {
    try {
        const rawJson = preTags[0].innerText;
        const json = JSON.parse(rawJson);
        const beautifiedContainer = beautifyJson(json);
        
        document.body.innerHTML = '';
        
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle JSON View';
        document.body.appendChild(toggleButton);
        document.body.appendChild(beautifiedContainer);
        
        let isBeautified = true;
        
        toggleButton.addEventListener('click', () => {
            if (isBeautified) {
                document.body.removeChild(beautifiedContainer);
                const rawContainer = document.createElement('pre');
                rawContainer.textContent = rawJson;
                rawContainer.className = 'raw-json';
                document.body.appendChild(rawContainer);
            } else {
                const rawContainer = document.querySelector('.raw-json');
                if (rawContainer) {
                    document.body.removeChild(rawContainer);
                }
                document.body.appendChild(beautifiedContainer);
            }
            isBeautified = !isBeautified;
        });
        
        
        const style = document.createElement('style');
        style.textContent = `
        .json-container {
          font-family: monospace;
          white-space: pre-wrap;
        }
        .json-item {
          margin-left: 20px;
        }
        .json-key {
          color: brown;
        }
        .json-value {
          color: navy;
        }
        .json-toggle {
          cursor: pointer;
          color: blue;
          user-select: none;
        }
        button {
          display: block;
          margin: 10px 0;
        }
      `;
        document.head.appendChild(style);
    } catch (e) {
        console.error('This is not a valid JSON:', e);
    }
}


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function beautifyJson(json) {
    const container = createNode('div');
    container.className = 'json-container';
    
    function createElement(key, value, isLast) {
        const item = createNode('div');
        item.className = 'json-item';
        
        const keyElement = createNode('span');
        keyElement.className = 'json-key';
        keyElement.textContent = `"${key}": `;
        append(item, keyElement);
        
        if (typeof value === 'object' && value !== null) {
            const toggleButton = createNode('span');
            toggleButton.className = 'json-toggle';
            toggleButton.textContent = '[-]';
            append(item, toggleButton);
            
            const valueContainer = createNode('div');
            valueContainer.className = 'json-value-container';
            
            for (let k in value) {
                const childElement = createElement(k, value[k], false);
                append(valueContainer, childElement);
            }
            
            valueContainer.style.display = 'block';
            append(item, valueContainer);
            
            toggleButton.addEventListener('click', () => {
                const isCollapsed = valueContainer.style.display === 'none';
                valueContainer.style.display = isCollapsed ? 'block' : 'none';
                toggleButton.textContent = isCollapsed ? '[-]' : '[+]';
            });
        } else {
            const valueElement = createNode('span');
            valueElement.className = 'json-value';
            valueElement.textContent = JSON.stringify(value);
            append(item, valueElement);
        }
        
        if (!isLast) {
            const commaElement = createNode('span');
            commaElement.textContent = ',';
            append(item, commaElement);
        }
        
        return item;
    }
    
    for (let key in json) {
        const element = createElement(key, json[key], false);
        append(container, element);
    }
    
    return container;
}
