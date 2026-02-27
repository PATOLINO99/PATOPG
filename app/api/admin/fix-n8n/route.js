import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key !== 'sanPATO123') { // Simple protection
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('🔄 RESTARTING N8N CONTAINER...');

        // Command to restart N8N container
        // Assuming container name is 'n8n' or similar. 
        // We'll try common names: 'n8n', 'n8n_n8n_1', 'root-n8n-1'
        // Or better: 'docker ps' to find it.

        const { stdout, stderr } = await execAsync('docker restart $(docker ps -q -f name=n8n) || docker restart n8n');

        console.log('✅ RESTART OUTPUT:', stdout);
        if (stderr) console.error('⚠️ RESTART STDERR:', stderr);

        return NextResponse.json({
            success: true,
            message: 'N8N Restart Command Executed',
            output: stdout
        });

    } catch (error) {
        console.error('❌ RESTART FAILED:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
