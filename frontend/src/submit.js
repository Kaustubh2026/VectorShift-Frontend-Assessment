
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!nodes.length && !edges.length) {
            alert('Please add at least one node before submitting.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();
            const { num_nodes, num_edges, is_dag } = data;

            alert(
                `Pipeline summary:\n\n` +
                `Nodes: ${num_nodes}\n` +
                `Edges: ${num_edges}\n` +
                `Is DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`
            );
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error submitting pipeline', error);
            alert('There was an error submitting the pipeline. Please ensure the backend is running on http://localhost:8000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-bar">
            <button
                type="button"
                className="vs-button vs-button--primary"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <>Submitting…</>
                ) : (
                    <>Validate pipeline →</>
                )}
            </button>
        </div>
    );
}

