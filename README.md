# Visualisation and metrics for Komodo World Record payments per second scale testing

Komodo is testing the limits of payment processing per second, and has already achieved rates faster than Visa and Mastercard.
This is achieved through "Grandmother of Merkle" notarisation via linked assetchains, with crypto-conditions (https://tools.ietf.org/html/draft-thomas-crypto-conditions-04) instituting a burn protocol, allowing parallel chains to act as a single cryptocurrency.

Demo at - http://cryptocartography.io/txscl_vis/

This visualisation uses - 
Highcharts (live data graph)
amCharts (speedometer)
particle.js (floating KMD)
socket.io (collects data from <link to server side pending> )

 *Note: Transactions may contain multiple payments. Payments per transaction are determined by calculating the ratio of transactions to the size of the solve block in bytes, and comapring the ratio to a look up table of known reference values)*
 
Stat bars show contextual information for transactions, payments, blocks solved and assest chains active within the last 5 minutes. 

A speedometer (using https://www.amcharts.com/demos/angular-gauge/) indicates combined payments per second from all asset chains (averaged over 60 seconds - the average block time)

A graph (using https://www.highcharts.com/) tracks combined payments per second, updating every 5 seconds. By default the last minute of history is plotted on the graph, though this time span can be expanded using the range selector at the bottom.
