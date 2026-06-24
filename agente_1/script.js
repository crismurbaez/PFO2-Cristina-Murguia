// ==========================================================================
// DATA DICTIONARY & CONFIGURATIONS
// ==========================================================================

const wordData = {
    'Time': {
        id: 'REF-001',
        word: 'Time',
        trans: 'Tiempo',
        ipa: '/taɪm/',
        type: 'Sustantivo',
        clue: 'En la escena del crimen, el <strong>reloj de arena</strong> de la víctima marca el <strong>tiempo</strong> (Time) exacto del suceso.'
    },
    'Clock': {
        id: 'REF-002',
        word: 'Clock',
        trans: 'Reloj',
        ipa: '/klɒk/',
        type: 'Sustantivo',
        clue: 'El <strong>reloj</strong> (Clock) de bolsillo del sospechoso se detuvo en el momento del forcejeo, arruinando su coartada.'
    },
    'Witness': {
        id: 'REF-003',
        word: 'Witness',
        trans: 'Testigo / Presenciar',
        ipa: '/ˈwɪtnəs/',
        type: 'Sustantivo / Verbo',
        clue: 'El <strong>testigo</strong> (Witness) asegura haber visto una silueta escapar entre la neblina londinense.'
    },
    'Eye': {
        id: 'REF-004',
        word: 'Eye',
        trans: 'Ojo',
        ipa: '/aɪ/',
        type: 'Sustantivo',
        clue: 'Un destello dorado llamó la atención del <strong>ojo</strong> (Eye) del detective al examinar el suelo de la biblioteca.'
    },
    'Evidence': {
        id: 'REF-005',
        word: 'Evidence',
        trans: 'Evidencia / Prueba',
        ipa: '/ˈevɪdəns/',
        type: 'Sustantivo',
        clue: 'Cada pequeña <strong>evidencia</strong> (Evidence) recogida, como una huella de ceniza de pipa, nos acerca al culpable.'
    },
    'Case': {
        id: 'REF-006',
        word: 'Case',
        trans: 'Caso / Expediente',
        ipa: '/keɪs/',
        type: 'Sustantivo',
        clue: 'El inspector Lestrade consideró que el <strong>caso</strong> (Case) era un callejón sin salida, pero Holmes pensó lo contrario.'
    },
    'Solve': {
        id: 'REF-007',
        word: 'Solve',
        trans: 'Resolver',
        ipa: '/sɒlv/',
        type: 'Verbo',
        clue: 'Para <strong>resolver</strong> (Solve) el misterio, primero debemos organizar las contradicciones de los sospechosos.'
    },
    'Key': {
        id: 'REF-008',
        word: 'Key',
        trans: 'Llave / Clave',
        ipa: '/kiː/',
        type: 'Sustantivo',
        clue: 'La <strong>llave</strong> (Key) dorada fue hallada oculta dentro del forro del sombrero de copa del mayordomo.'
    },
    'Lock': {
        id: 'REF-009',
        word: 'Lock',
        trans: 'Cerradura / Cerrar',
        ipa: '/lɒk/',
        type: 'Verbo / Sustantivo',
        clue: 'El cerrojo o <strong>cerradura</strong> (Lock) de la caja fuerte fue forzado con una precisión quirúrgica.'
    }
};

// Custom association clues when linking two words
const connectionClues = {
    'Time-Clock': 'El transcurso del <strong>tiempo</strong> (Time) es medido con precisión matemática por la maquinaria de un <strong>reloj</strong> (Clock). <em>¡Conexión temporal perfecta!</em>',
    'Witness-Eye': 'El <strong>testigo</strong> (Witness) es el que aporta el testimonio directo a través de lo que capturó su propio <strong>ojo</strong> (Eye) en la escena. <em>¡Conexión visual lógica!</em>',
    'Key-Lock': 'La <strong>llave</strong> (Key) es la única herramienta diseñada con la combinación exacta para abrir la <strong>cerradura</strong> (Lock) del secreto. <em>¡Conexión operativa perfecta!</em>',
    'Evidence-Case': 'Toda <strong>evidencia</strong> (Evidence) recolectada es el combustible analítico que da cuerpo e impulsa la resolución de un <strong>caso</strong> (Case). <em>¡Conexión procesal lógica!</em>',
    'Case-Solve': 'El fin primordial de abrir e investigar un <strong>caso</strong> (Case) es desenredar sus incógnitas y lograrlo <strong>resolver</strong> (Solve) con éxito. <em>¡Conexión de objetivo resuelta!</em>',
    'Eye-Lock': 'Mirar de reojo a través de la <strong>cerradura</strong> (Lock) con un solo <strong>ojo</strong> (Eye) fue cómo descubrieron el cónclave secreto. <em>¡Conexión de espionaje establecida!</em>',
    'Clue-Solve': 'Una buena <strong>pista</strong> nos indica el camino correcto para <strong>resolver</strong> (Solve) los acertijos cognitivos.'
};

// ==========================================================================
// APP STATE
// ==========================================================================

let activeMode = 'explore'; // 'explore' or 'link'
let selectedNodeId = null;
let linkSourceNodeId = null;
let createdConnections = []; // Array of objects { from: id, to: id }

// Add default connections on initialization to showcase the board
const defaultConnections = [
    { from: 'node-time', to: 'node-clock' },
    { from: 'node-witness', to: 'node-eye' },
    { from: 'node-key', to: 'node-lock' }
];

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================

const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');

const btnExploreMode = document.getElementById('btnExploreMode');
const btnLinkMode = document.getElementById('btnLinkMode');
const btnResetBoard = document.getElementById('btnResetBoard');

const corkboard = document.getElementById('corkboard');
const corkboardSvg = document.getElementById('corkboardSvg');
const wordNodes = document.querySelectorAll('.word-node');

const dossierPlaceholder = document.getElementById('dossierPlaceholder');
const dossierContent = document.getElementById('dossierContent');
const dossierWordName = document.getElementById('dossierWordName');
const dossierWordId = document.getElementById('dossierWordId');
const dossierWordIpa = document.getElementById('dossierWordIpa');
const dossierWordTrans = document.getElementById('dossierWordTrans');
const dossierWordClue = document.getElementById('dossierWordClue');
const dossierConnectionsList = document.getElementById('dossierConnectionsList');

const caseForm = document.getElementById('caseForm');
const btnSubmitForm = document.getElementById('btnSubmitForm');
const formResponse = document.getElementById('formResponse');

// ==========================================================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', () => {
        const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !expanded);
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active class
            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Dashboard controls
    btnExploreMode.addEventListener('click', () => setMode('explore'));
    btnLinkMode.addEventListener('click', () => setMode('link'));
    btnResetBoard.addEventListener('click', resetBoard);

    // Click handler for word cards
    wordNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            handleNodeClick(node.id);
        });
    });

    // Window resize redrawing
    window.addEventListener('resize', () => {
        drawConnections();
    });

    // Contact form submit simulation
    if (caseForm) {
        caseForm.addEventListener('submit', handleFormSubmit);
    }

    // Set default mockup connections and draw them
    createdConnections = [...defaultConnections];
    // Small delay to ensure layout rendering calculations are precise
    setTimeout(() => {
        drawConnections();
    }, 200);
});

// ==========================================================================
// INTERACTIVE DASHBOARD LOGIC
// ==========================================================================

// Change active interaction mode
function setMode(mode) {
    activeMode = mode;
    
    // Clear temporary link states
    if (linkSourceNodeId) {
        const sourceNode = document.getElementById(linkSourceNodeId);
        if (sourceNode) sourceNode.classList.remove('link-source');
        linkSourceNodeId = null;
    }

    if (mode === 'explore') {
        btnExploreMode.classList.add('active');
        btnLinkMode.classList.remove('active');
        document.querySelector('.toolbar-mode-indicator span:last-child').innerHTML = 'Caso Activo: <strong>Las Palabras Clave</strong>';
    } else {
        btnExploreMode.classList.remove('active');
        btnLinkMode.classList.add('active');
        document.querySelector('.toolbar-mode-indicator span:last-child').innerHTML = 'Modo Enlace: <strong>Traza un hilo entre dos tarjetas</strong>';
        
        // Clear normal selection visual from nodes
        wordNodes.forEach(n => n.classList.remove('selected'));
    }
}

// Click route based on mode
function handleNodeClick(nodeId) {
    if (activeMode === 'explore') {
        selectNode(nodeId);
    } else {
        handleLinkSelection(nodeId);
    }
}

// Explore Mode: display word expediente in dossier panel
function selectNode(nodeId) {
    // Styling toggle
    wordNodes.forEach(node => {
        if (node.id === nodeId) {
            node.classList.add('selected');
        } else {
            node.classList.remove('selected');
        }
    });

    selectedNodeId = nodeId;
    const nodeEl = document.getElementById(nodeId);
    const key = nodeEl.dataset.word;
    const data = wordData[key];

    if (!data) return;

    // Show dossier elements
    dossierPlaceholder.classList.add('hidden');
    dossierContent.classList.remove('hidden');

    // Populate metadata
    dossierWordName.textContent = data.word;
    dossierWordId.textContent = data.id;
    dossierWordIpa.textContent = data.ipa;
    dossierWordTrans.textContent = data.trans;
    dossierWordClue.innerHTML = data.clue;

    // List active connections for this specific word
    updateDossierConnections(nodeId, key);
}

// Update the list of active links in the dossier for a selected node
function updateDossierConnections(nodeId, wordKey) {
    dossierConnectionsList.innerHTML = '';
    
    // Find all connections matching this node ID
    const matches = createdConnections.filter(c => c.from === nodeId || c.to === nodeId);
    
    if (matches.length === 0) {
        dossierConnectionsList.innerHTML = '<span class="text-muted" style="font-size: 0.8rem; font-style: italic;">Sin conexiones trazadas en este tablero.</span>';
        return;
    }

    matches.forEach(conn => {
        const otherNodeId = conn.from === nodeId ? conn.to : conn.from;
        const otherNodeEl = document.getElementById(otherNodeId);
        
        if (!otherNodeEl) return;
        
        const otherWord = otherNodeEl.dataset.word;
        const otherData = wordData[otherWord];

        const badge = document.createElement('div');
        badge.className = 'badge-conn';
        badge.innerHTML = `
            <span class="badge-word">${otherWord}</span>
            <span class="badge-arrow">↔</span>
            <span class="badge-type">${otherData.type}</span>
        `;
        
        // Clicking badge navigates to that card
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            selectNode(otherNodeId);
        });

        dossierConnectionsList.appendChild(badge);
    });
}

// Link Mode: link two words together
function handleLinkSelection(nodeId) {
    const nodeEl = document.getElementById(nodeId);

    // Clicked the same card - cancel source selection
    if (linkSourceNodeId === nodeId) {
        nodeEl.classList.remove('link-source');
        linkSourceNodeId = null;
        return;
    }

    // Step 1: Select first node (Source)
    if (!linkSourceNodeId) {
        linkSourceNodeId = nodeId;
        nodeEl.classList.add('link-source');
        return;
    }

    // Step 2: Select second node (Target) and draw link
    const sourceNodeEl = document.getElementById(linkSourceNodeId);
    
    // Check if the link already exists in either direction
    const linkExists = createdConnections.some(c => 
        (c.from === linkSourceNodeId && c.to === nodeId) || 
        (c.from === nodeId && c.to === linkSourceNodeId)
    );

    if (!linkExists) {
        createdConnections.push({
            from: linkSourceNodeId,
            to: nodeId
        });
        
        drawConnections();
        showConnectionClue(linkSourceNodeId, nodeId);
    } else {
        // Link exists, select the target node to view its dossier
        setMode('explore');
        selectNode(nodeId);
        return;
    }

    // Reset linking state, return to exploration styling
    sourceNodeEl.classList.remove('link-source');
    linkSourceNodeId = null;
    
    // Switch to explore mode automatically so they see the result in the dossier
    setMode('explore');
    
    // Highlight the target node as selected
    selectNode(nodeId);
}

// Displays dossier narrative explaining the logic of the connection made
function showConnectionClue(nodeId1, nodeId2) {
    const word1 = document.getElementById(nodeId1).dataset.word;
    const word2 = document.getElementById(nodeId2).dataset.word;

    // Find direct association clue or reverse key
    let clueText = connectionClues[`${word1}-${word2}`] || connectionClues[`${word2}-${word1}`];

    if (!clueText) {
        // Generate dynamic relational clue if none is explicitly declared
        clueText = `Has conectado <strong>${word1}</strong> y <strong>${word2}</strong>. <br><br><strong>Pista Lógica de la Agencia:</strong> Para fijarlas en tu memoria, imagina al sospechoso usando el/la <strong>${word1}</strong> mientras examina detenidamente el/la <strong>${word2}</strong> en su bitácora confidencial.`;
    }

    // Show custom dossier content representing the established connection
    dossierPlaceholder.classList.add('hidden');
    dossierContent.classList.remove('hidden');

    dossierWordName.innerHTML = `${word1} <span style="font-size: 1.5rem; color: var(--accent-gold);">↔</span> ${word2}`;
    dossierWordId.textContent = 'LINK-CASE';
    dossierWordIpa.textContent = 'Hilos de Conexión Activos';
    dossierWordTrans.innerHTML = `<span style="font-size: 1.1rem; color: var(--text-secondary);">Asociación Mental Realizada</span>`;
    dossierWordClue.innerHTML = clueText;

    // Redraw badges
    dossierConnectionsList.innerHTML = `
        <div class="badge-conn" style="background-color: var(--accent-green);">
            <span class="badge-word">${word1}</span> <span class="badge-arrow">↔</span> <span class="badge-word">${word2}</span>
        </div>
    `;
}

// Coordinates logic to draw curved SVG lines between cards on the corkboard
function drawConnections() {
    // Clear existing paths
    corkboardSvg.innerHTML = '';
    
    const boardRect = corkboard.getBoundingClientRect();
    
    createdConnections.forEach(conn => {
        const fromNode = document.getElementById(conn.from);
        const toNode = document.getElementById(conn.to);
        
        if (!fromNode || !toNode) return;
        
        const fromCoords = getPinCoordinates(fromNode, boardRect);
        const toCoords = getPinCoordinates(toNode, boardRect);
        
        // Create curved path (quadratic bezier curve sagging downwards due to gravity)
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const x1 = fromCoords.x;
        const y1 = fromCoords.y;
        const x2 = toCoords.x;
        const y2 = toCoords.y;
        
        // Sag calculation: average point shifted down
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Control point: midpoint + sag offset based on distance
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2 + (distance * 0.12) + 15; // Sag downwards
        
        const pathData = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#d13030'); // Red string thread
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('filter', 'drop-shadow(0px 2px 3px rgba(0,0,0,0.5))');
        
        corkboardSvg.appendChild(path);
    });
}

// Computes top-center pin coordinate of a word node card relative to the board
function getPinCoordinates(node, boardRect) {
    const rect = node.getBoundingClientRect();
    return {
        x: rect.left - boardRect.left + (rect.width / 2),
        y: rect.top - boardRect.top + 6 // position of the pin node inside the card top boundary
    };
}

// Clear all user and default connections
function resetBoard() {
    createdConnections = [];
    drawConnections();
    
    // Reset dossier view
    dossierPlaceholder.classList.remove('hidden');
    dossierContent.classList.add('hidden');
    
    // Clear node classes
    wordNodes.forEach(n => {
        n.classList.remove('selected');
        n.classList.remove('link-source');
    });
    
    if (linkSourceNodeId) {
        linkSourceNodeId = null;
    }
    
    setMode('explore');
}

// ==========================================================================
// FORM SUBMISSION & INTERACTION
// ==========================================================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Disable submit button and show loading text
    btnSubmitForm.disabled = true;
    const originalText = btnSubmitForm.innerHTML;
    btnSubmitForm.innerHTML = 'Transmitiendo Telegrama...';
    
    // Simulate server request delay
    setTimeout(() => {
        // Reset form inputs
        const agentName = document.getElementById('agentName').value;
        caseForm.reset();
        
        // Re-enable and hide button
        btnSubmitForm.classList.add('hidden');
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = originalText;
        
        // Customize success text
        const responseText = document.getElementById('responseText');
        responseText.innerHTML = `Saludos, <strong>${agentName}</strong>. El telegrama cifrado ha sido despachado a la central en 221B Baker Street. Hemos reservado tu primer expediente de estudio y un inspector se pondrá en contacto por conducto seguro a la brevedad.`;
        
        // Show success stamp
        formResponse.classList.remove('hidden');
        formResponse.style.animation = 'pulseGlow 2s infinite alternate';
    }, 1800);
}
