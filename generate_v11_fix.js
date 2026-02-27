const fs = require('fs');
const crypto = require('crypto');

// Use local temp V4 file as base
const sourcePath = 'c:\\Users\\gui\\Desktop\\Cpy;ANTIGRAVITY\\temp_v4.json';
const destPath = 'c:\\Users\\gui\\Downloads\\TYPEBOT_ZAPSCALE_PRO_V11_SCHEMA_FIX.json';

function genId(prefix) {
    return prefix + crypto.randomBytes(4).toString('hex');
}

try {
    const rawData = fs.readFileSync(sourcePath, 'utf8');
    const data = JSON.parse(rawData);

    // Update Metadata
    data.version = "6";
    data.id = 'zapscale-pro-v11-fixed';
    data.name = 'ZapScale PRO V11 (Schema OK)';

    // 1. Create Variable
    if (!data.variables) data.variables = [];
    const varId = genId("var_");
    data.variables.push({ id: varId, name: "Opcao_Menu" });

    // 2. IDs
    const groupRouterId = genId("group_");
    const blockCondId = genId("block_");
    const groupFallbackId = genId("group_");
    const blockFallbackTxtId = genId("block_");
    const inputBlockId = genId("input_");

    // 3. Modify Welcome Group
    const groupWelcome = data.groups.find(g => g.id === "group_welcome");

    // Find choice input
    const choiceBlockIdx = groupWelcome.blocks.findIndex(b => b.type === "choice input");
    const choiceBlock = choiceBlockIdx !== -1 ? groupWelcome.blocks[choiceBlockIdx] : null;

    // Map Destinations from Choice
    const itemDestinations = {};
    if (choiceBlock) {
        if (choiceBlock.items) {
            for (const item of choiceBlock.items) {
                const edge = data.edges.find(e => e.from && e.from.itemId === item.id);
                if (edge) {
                    itemDestinations[item.id] = edge.to.groupId;
                }
            }
        }
        // Remove old choice edges
        data.edges = data.edges.filter(e => !e.from || e.from.blockId !== choiceBlock.id);
    }

    if (Object.keys(itemDestinations).length === 0) {
        // Fallback mapping if choice items missing or edges broken
        const vGroup = data.groups.find(g => g.id === 'group_vendedor');
        if (vGroup) itemDestinations["opt_vendedor"] = vGroup.id;

        const aGroup = data.groups.find(g => g.id === 'group_agenda');
        if (aGroup) itemDestinations["opt_agenda"] = aGroup.id;

        const hGroup = data.groups.find(g => g.id === 'group_humano');
        if (hGroup) itemDestinations["opt_humano"] = hGroup.id;
    }

    // Create edge for new input
    const edgeInputToRouterId = genId("edge_");

    // Create Text Input Block CORRECTLY (No 'content' property!)
    const newInputBlock = {
        id: inputBlockId,
        type: "text input",
        options: {
            labels: {
                placeholder: "Digite sua opção..."
            },
            variableId: varId
        },
        outgoingEdgeId: edgeInputToRouterId
    };

    if (choiceBlockIdx !== -1) {
        groupWelcome.blocks[choiceBlockIdx] = newInputBlock;
    } else {
        groupWelcome.blocks.push(newInputBlock);
    }

    // Add Edge to Router
    data.edges.push({
        id: edgeInputToRouterId,
        from: { blockId: inputBlockId },
        to: { groupId: groupRouterId }
    });

    // Update Menu Text
    const txtMenu = groupWelcome.blocks.find(b => b.id === "txt_menu");
    if (txtMenu) {
        txtMenu.content = {
            richText: [
                { type: "p", children: [{ text: "Qual destas soluções faz mais sentido para o seu momento atual?\n\n1️⃣ Vendedor 24h\n2️⃣ IA + Agenda\n3️⃣ Humano" }] },
                { type: "p", children: [{ text: "👉 Escreva sua opção abaixo:" }] }
            ]
        };
    }

    // 4. Create Router (Condition Block)
    const conditionItems = [];
    const edgeRouterToFallbackId = genId("edge_");

    function addLogic(keywords, legacyItemId) {
        let targetGroupId = itemDestinations[legacyItemId];
        // Same fallback logic as before
        if (!targetGroupId) {
            if (legacyItemId.includes("vendedor")) targetGroupId = data.groups.find(g => g.id === 'group_vendedor')?.id;
            else if (legacyItemId.includes("agenda")) targetGroupId = data.groups.find(g => g.id === 'group_agenda')?.id;
            else if (legacyItemId.includes("humano")) targetGroupId = data.groups.find(g => g.id === 'group_humano')?.id;
        }

        if (!targetGroupId) return;

        const itemId = genId("item_");
        const edgeId = genId("edge_");

        data.edges.push({
            id: edgeId,
            from: { blockId: blockCondId, itemId: itemId },
            to: { groupId: targetGroupId }
        });

        conditionItems.push({
            id: itemId,
            content: {
                comparisons: keywords.map(k => ({
                    variableId: varId,
                    comparisonOperator: "CONTAINS",
                    value: k
                })),
                type: "OR"
            },
            outgoingEdgeId: edgeId
        });
    }

    addLogic(["1", "Vendedor", "vendedor", "80", "Digital", "digital"], "opt_vendedor");
    addLogic(["2", "Agenda", "agenda", "197", "IA", "ia"], "opt_agenda");
    addLogic(["3", "Humano", "humano", "Falar", "falar"], "opt_humano");

    // Default Edge
    data.edges.push({
        id: edgeRouterToFallbackId,
        from: { blockId: blockCondId },
        to: { groupId: groupFallbackId }
    });

    const groupRouter = {
        id: groupRouterId,
        title: "Roteamento Inteligente",
        graphCoordinates: { x: 400, y: 200 },
        blocks: [
            {
                id: blockCondId,
                type: "condition",
                items: conditionItems,
                outgoingEdgeId: edgeRouterToFallbackId
            }
        ]
    };
    data.groups.push(groupRouter);

    // 5. Fallback Group
    const edgeFallbackLoopId = genId("edge_");

    data.edges.push({
        id: edgeFallbackLoopId,
        from: { blockId: blockFallbackTxtId },
        to: { groupId: "group_welcome" }
    });

    const groupFallback = {
        id: groupFallbackId,
        title: "Erro (Fallback)",
        graphCoordinates: { x: 400, y: 600 },
        blocks: [
            {
                id: blockFallbackTxtId,
                type: "text",
                content: {
                    richText: [{ type: "p", children: [{ text: "⚠️ Não entendi. Digite '1', '2' ou 'Humano' para prosseguir." }] }]
                },
                outgoingEdgeId: edgeFallbackLoopId
            }
        ]
    };
    data.groups.push(groupFallback);

    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
    fs.writeFileSync(destPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Success! File created at ${destPath}`);

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
