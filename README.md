# Visualisation and metrics for Komodo World Record payments per second scale testing

Komodo is testing the limits of payment processing per second, and has already achieved rates faster than Visa and Mastercard.
This is achieved through "Grandmother of Merkle" notarisation via linked assetchains, with crypto-conditions (https://tools.ietf.org/html/draft-thomas-crypto-conditions-04) instituting a burn protocol, allowing parallel chains to act as a single cryptocurrency.

This visualisation uses D3 (https://d3js.org/) libraries to create bubbles that float across the x axis (left to right) of the screen for each solved block from the TXSCL asset chains. Bubbles are dynamically rendered via the following parameters - 

### Speed ###
A baseline value for the time taken to float left to right is hardcoded, with multipliers applied.
Solve multiplier = Actual block solve time relative to expected block solve time (1 minute). The quicker a block is solved, the faster a bubble will travel across the screen.
Slider multiplier = User input from bubble speed range slider.

### Color ###
Currently random, but could be used to indicate which Asset Chain the solved block belongs to.

### Float Path ###
A randomized animation across the y axis (up to down) to provide some variation of overall float path for aesthetic purposes.

### Size ###
Bubble size grows in proportion to the number of payments processed within the solved block.

 *Note: Transactions may contain multiple payments. Payments per transaction are determined by calculating the ratio of transactions to the size of the solve block in bytes, and comapring the ratio to a look up table of known reference values)*

## Range Sliders ##

By default, rendered bubbles will self destruct once thier path across the screen has been completed. Due to the rendering load of a potentially large number of bubbles, range slider inputs are available to allow customisation of rendering to avoid jank on devices with insufficient processing capability.

### Bubble Count ###
Limits the maximum number of bubbles generated. This may result in solved blocks not being rendered if the maximum allowed have already been rendered (increasing the speed range slider value can mitigate this).

### Bubble Speed ###
Changes the time taken for a bubble to travel across the screen (and self destruct).

### Bubble Scale ###
Changes the size of bubbles, and the legend values indicating payments relative to bubble size. Allows user to resize bubbles to more appropriate sizes for the current network payments per transaction values. This is like zooming in, so you can see bubbles with low payments, or zooming out, so individual bubbles do not flood the screen.

 *Note: Smaller bubbles are less resource heavy to render and animate.*

## Other Metrics ##

Stat bars show contextual information for transactions, payments, blocks solved and assest chains active within the last 5 minutes. 

A speedometer (using https://www.amcharts.com/demos/angular-gauge/) indicates combined payments per second from all asset chains (averaged over 60 seconds - the average block time)

A graph (using https://www.highcharts.com/) tracks combined payments per second, updating every 5 seconds. By default the last minute of history is plotted on the graph, though this time span can be expanded using the range selector at the bottom.


## Inspiration and thanks to ##

Mike Bostock - https://bost.ocks.org/mike/ | https://twitter.com/mbostock

Torstein Hønsi - https://www.highcharts.com/ | https://twitter.com/torsteinhonsi?lang=en

Antanas Marcelionis - https://www.amcharts.com/ | https://twitter.com/marcelionis?lang=en

Nadieh Bremer - https://www.visualcinnamon.com | https://twitter.com/NadiehBremer

Komodo - https://komodoplatform.com/




