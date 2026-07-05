// submit.js

import { useEffect, useState } from 'react';
import { useStore } from './store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isOpen = Boolean(result || error);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setResult(null);
                setError('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const closeModal = () => {
        setResult(null);
        setError('');
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setResult(null);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Unable to parse pipeline.');
            }

            setResult(await response.json());
        } catch (requestError) {
            setError(requestError.message || 'Unable to parse pipeline.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-bar">
            <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Parsing...' : 'Submit Pipeline'}
            </button>

            {isOpen ? (
                <div className="modal-backdrop" role="presentation" onMouseDown={closeModal}>
                    <section
                        className="summary-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="summary-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <button className="modal-close-button" type="button" onClick={closeModal} aria-label="Close">
                            x
                        </button>

                        {result ? (
                            <>
                                <div className={`modal-status ${result.is_dag ? 'success' : 'warning'}`}>
                                    {result.is_dag ? 'DAG Ready' : 'Cycle Detected'}
                                </div>
                                <h2 id="summary-title">Pipeline Summary</h2>
                                <div className="summary-grid">
                                    <div>
                                        <span>Nodes</span>
                                        <strong>{result.num_nodes}</strong>
                                    </div>
                                    <div>
                                        <span>Edges</span>
                                        <strong>{result.num_edges}</strong>
                                    </div>
                                    <div>
                                        <span>DAG Status</span>
                                        <strong>{result.is_dag ? 'Valid' : 'Has cycle'}</strong>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="modal-status warning">Request Failed</div>
                                <h2 id="summary-title">Pipeline Summary</h2>
                                <p className="modal-message">{error}</p>
                            </>
                        )}
                    </section>
                </div>
            ) : null}
        </div>
    );
}
