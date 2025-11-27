type ScoreWeights = {
    salary: number;
    workMode: number;
    location: number;
};

type ScoreSlidersProps = {
    weights: ScoreWeights;
    onChange: (weights: ScoreWeights) => void;
    onReset: () => void;
};

const ScoreSliders = ({ weights, onChange, onReset }: ScoreSlidersProps) => {
    const handleSalaryChange = (value: number) => {
        const salary = value;
        const rest = 1 - salary;
        onChange({
            salary,
            workMode: rest * 0.6,
            location: rest * 0.4,
        });
    };

    const handleWorkModeChange = (value: number) => {
        const workMode = value;
        const rest = 1 - workMode;
        onChange({
            salary: rest * 0.6,
            workMode,
            location: rest * 0.4,
        });
    };

    const handleLocationChange = (value: number) => {
        const location = value;
        const rest = 1 - location;
        onChange({
            salary: rest * 0.6,
            workMode: rest * 0.25,
            location,
        });
    };

    return (
        <section className="compare-section compare-weights">
            <h2 className="section-title">What matters most to you?</h2>
            <p className="text-muted">
                Adjust the sliders to change how much each factor affects the score.
            </p>

            <div className="compare-weights-sliders">
                <label className="slider-label">
                    Salary ({Math.round(weights.salary * 100)}%)
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={weights.salary * 100}
                        onChange={(e) => handleSalaryChange(Number(e.target.value) / 100)}
                    />
                </label>

                <label className="slider-label">
                    Work mode ({Math.round(weights.workMode * 100)}%)
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={weights.workMode * 100}
                        onChange={(e) =>
                            handleWorkModeChange(Number(e.target.value) / 100)
                        }
                    />
                </label>

                <label className="slider-label">
                    Location ({Math.round(weights.location * 100)}%)
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={weights.location * 100}
                        onChange={(e) =>
                            handleLocationChange(Number(e.target.value) / 100)
                        }
                    />
                </label>
            </div>

            <button type="button" className="btn btn-outline small" onClick={onReset}>
                Reset to default weights
            </button>
        </section>
    );
};

export default ScoreSliders;
