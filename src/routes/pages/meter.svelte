<script lang="ts">
	import { onDestroy } from 'svelte';

	import Meter from '$lib/Meter.svelte';
	import Table from '$lib/Table.svelte';
	import tableStyles from './tableStyles';

	const componentName = 'Meter';
	const githubSourceLink = 'https://github.com/oslabs-beta/Svve11/package/Meter.svelte';
	const WAIARIApracticesLink = 'https://w3c.github.io/aria-practices/#meter';

	let changingValue: number;
	$: changingValue = 60;

	const interval = setInterval(function () {
		changingValue = Math.floor(Math.random() * 100);
	}, 2000);

	onDestroy(() => clearInterval(interval));

	const tableOptions = {
		id: 'props-table-meter',
		ariaLabel: 'Meter props table',
		ariaDescription:
			'This table describes the props that should be passed to the meter in the options object',
		columnNames: ['Prop', 'Type', 'Required', 'Default Value'],
		rowsContent: [
			['value', 'number', 'true', 'N/A'],
			['maxValue', 'number', 'true', 'N/A'],
			['minValue', 'number', 'true', 'N/A'],
			['meterLabel', 'string', 'true', 'N/A'],
			['lowValue', 'number', 'false', 'N/A'],
			['highValue', 'number', 'false', 'N/A'],
			['optimumValue', 'number', 'false', 'N/A'],
			['valueText', 'string', 'false', 'N/A'],
			['displayDecimal', 'boolean', 'false', 'false'],
			['units', 'string', 'false', 'N/A'],
			['meterStyle', 'string', 'false', 'N/A'],
			['labelStyle', 'string', 'false', 'N/A']
		],
		styles: tableStyles
	};

	const meterOneOptions = {
		maxValue: 100,
		minValue: 0,
		meterLabel: 'Test Meter 1',
		id: 1
	};

	const meterTwoOptions = {
		maxValue: 100,
		minValue: 0,
		meterLabel: 'Test Meter 2',
		id: 2,
		lowValue: 20,
		highValue: 85,
		optimumValue: 80
	};

	const meterThreeOptions = {
		maxValue: 10,
		minValue: 0,
		meterLabel: 'Test Meter 3',
		id: 3,
		lowValue: 5,
		displayDecimal: true,
		units: ' hours remaining',
		valueText: `${changingValue} hours remaining`
	};

	const meterFourOptions = {
		maxValue: 10,
		minValue: 0,
		meterLabel: 'Test Meter 4',
		id: 4,
		lowValue: 5,
		meterStyle: 'width: 50px;',
		labelStyle: 'font-weight: bold; color: blue;'
	};
</script>

<article class="page-component">
	<header>
		<h1>{componentName}</h1>
		<ul class="resource-links-list">
			<li>Source: <a href={githubSourceLink} target="_blank">{githubSourceLink}</a></li>
			<li>
				WAI-ARIA: <a href={WAIARIApracticesLink} target="_blank">{WAIARIApracticesLink}</a>
			</li>
		</ul>
		<p class="header-paragraph">
			A meter is a graphical display of a numeric value that varies within a defined range. For
			example, a meter could be used to depict a device's current battery percentage or a car's fuel
			level
		</p>
	</header>

	<main>
		<section>
			<fieldset>
				<legend>Installation</legend>
				<h2>Installation</h2>
				<section class="content-section">
					<p>Import the component in the script section of your Svelte file:</p>
					<pre><code class="code-block">
import Meter from 'svve11/Meter.svelte'
            </code></pre>
				</section>
			</fieldset>
		</section>
		<!-- Usage Guide -->
		<section>
			<fieldset>
				<legend>Usage</legend>
				<h2>Usage</h2>
				<section class="content-section">
					<h3>Creating a Meter</h3>
					<p>
						To supply the meter with its contents, a value attribute and an options object are
						passed as props to the meter. These can be defined in the script section of the .svelte
						file or imported in from another location.
					</p>
					<ul class="options-object-list">
						<p>The value attribute is required and defined as follows:</p>
						<li>
							<span class="bold">value</span> (number): sets the current value of the meter. Must be within the minValue to
							maxValue range. It is recommended to use a reactive variable to allow meter value to
							change as necessary.
						</li>
						<p>The options object has 12 properties:</p>
						<h4>Required Props</h4>
						<li><span class="bold">maxValue</span> (number): sets the maximum value for the meter range</li>
						<li><span class="bold">minValue</span> (number): sets the minimum value for the meter range.</li>
						<li>
							<span class="bold">meterLabel</span> (string): sets the text label for the meter. The label will be
							automatically joined with a percentage calculation, unless otherwise specified. See
							displayDecimal in optional props section below.
						</li>
						<li>
							<span class="bold">id</span> (number): sets the id for the meter. Remember to provide different id numbers when
							instantiating more than one meter on a page as the id should be unique.
						</li>
						<h4>Optional Props</h4>
						<li>
							<span class="bold">highValue</span> (number): sets the value from which a current value above is considered
							high. Must be less than maxValue and greater than the minValue and lowValue.
						</li>
						<li>
							<span class="bold">lowValue</span> (number): sets the value from which a current value below is considered low.
							Must be greater than minValue and less than the maxValue and highValue.
						</li>
						<li>
							<span class="bold">optimumValue</span> (number): sets the optimal numeric value of the meter. Must be a number
							between the minValue and maxValue. If the optimal value is set between the minValue
							and lowValue, or the maxValue and highValue, this range is considered optimal.
							Different browsers will color the bar differently depending on where the current value
							falls in relation to the optimal value.
						</li>
						<li>
							<span class="bold">valueText</span> (string): used for assistive technologies that read the value of the meter
							to the users. Most assistive technologies will read value as a percentage by default,
							thus this props should be provided if a percentage read does not make sense in the
							context of your meter use.
						</li>
						<li>
							<span class="bold">displayDecimal</span> (boolean): this will default to false. If set to true, this indicates
							to the meter that the value should not be presented as a percentage. This prop must be
							accompanied by the units prop described next.
						</li>
						<li>
							<span class="bold">units</span> (string): sets the units to be displayed in the meter label should the
							percentage appearance not be relevant.
						</li>
						<li><span class="bold">meterstyle</span> (string): sets the style for the meter for any custom styles.</li>
						<li><span class="bold">labelStyle</span> (string): sets the style for the meter label for any custom styles.</li>
					</ul>

					<h4>Example Options Object:</h4>
					<pre><code class="code-block">
{`const meterOptions = {
	maxValue: 100,
	minValue: 0,
	meterLabel: 'Demo meter',
	id: 1,
	lowValue: 20,
	highValue: 85,
	optimumValue: 80
};`}
					</code></pre>

					<h4>Instantiating a Meter</h4>
					<pre><code class="code-block">
{`<Meter value={reactiveValue} options={meterOptions}/>`}
              </code></pre>
					<h4>Example meter with only required props:</h4>
					<div class="example-meter">
						<Meter value={Math.round(changingValue)} options={meterOneOptions} />
					</div>

					<h4>Example meter with highValue=85, lowValue=20 and optimalValue=80 props:</h4>
					<div class="example-meter">
						<Meter value={Math.round(changingValue)} options={meterTwoOptions} />
					</div>
					<h4>Example meter with displayDecimal=false and units props:</h4>
					<div class="example-meter">
						<Meter value={changingValue / 10} options={meterThreeOptions} />
					</div>
					<h4>Example meter with style strings:</h4>
					<div class="example-meter">
						<Meter value={Math.round(changingValue) / 10} options={meterFourOptions} />
					</div>
				</section>
			</fieldset>
		</section>

		<section>
			<fieldset>
				<legend>Styling</legend>
				<h2>Styling</h2>
				<p>
					The meter is made of 2 sub-components that can have styles applied to them using the
					pre-assigned classes and a globally scoped CSS stylesheet. The classes are:
				</p>
				<ul class="options-object-list">
					<li><span class="bold">sv-meter</span>: This applies styling to the meter itself</li>
					<li><span class="bold">sv-meter-label</span>: This applies styling to the label for the meter</li>
				</ul>
			</fieldset>
		</section>

		<section>
			<fieldset>
				<legend>Component API</legend>
				<h2>Component API</h2>
				<div role="region" tabindex="0" style="max-width:100%;overflow:auto" class="props-table">
					<Table options={tableOptions} />
				</div>
			</fieldset>
		</section>
	</main>
</article>

<style>
</style>
