# DevOps Milestone 2 
##Test Analysis

    Divya Jain (djain2)
    Shrenik Gala (sngala)
    Prashant Gupta (pgupta7)
    
####Target Project
We have used a simple **NodeJs** application for this stage of the project which acts as a library for creating random strings. The main source files are present in the <code>lib</code> folder and the test file is present in <code>test</code> folder.We have configured **Jenkins** on our machine as our build server.

####
We are using **Mocha** as the testing framework and **Istanbul** to measure test coverage. We have used the technique of constraint based test generation to increase the coverage.
We are running the static analysis tool **PMD** on the source code. With the help of the precommit hook , we have ensured that a commit gets rejected if statement test coverage is less than 80% or if the custom rule in PMD analysis is violated or any security token or key is detected.

##Jenkins Configuration

####Plugins Used

- **GitHub Plugin**<br>
    This plugin enables us to use Git as the source code management tool. We have specified the path of the local Git repository in the Repository URL. 
- **PMD Plugin**<br>
    This plugin helps us collect the PMD analysis results of the project and visualises the found warnings.
- **Static Analysis Collector Plugin**<br>
    This add-on plugin to PMD collects the analysis results and shows them on a combined trend graph
- **Hudson post build Plugin**<br>
    This plugin helps us execute post-build tasks such as executing scripts once the build is done.

###Test section
####Unit Testing & Coverage

We used **Mocha** framework for unit testing. The screenshot for the unit test results is attached below:
![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/NpmTestScreenshot.png)

We used **Istanbul** to measure the test coverage. The command and the screenshot is as follows <br>
<code>node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha</code><br><br>
Coverage<br>
![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/CoverageBefore.png)


####Improving Coverage

We used constraint based test generation to generate test cases which increased the test coverage significantly. The script <code>addconstraints.js</code> adds the additional constraints to generate additional tests.
The screenshot for the improved test coverage is as follows <br>

Coverage after constraint based test generation<br>
![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/coverageafter.png)

The screencast showing the above process of unit testing, test coverage and constraint based test generation is as follows:<br>

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/unit%20testing%20and%20constraint%20testing.gif)

We have also ensured that if the statement coverage is less than 80%, then the commit is rejected.

        node parser.js
        RETVAL=$?
        if [ $RETVAL -ne 0 ]
        then
            echo ""
            echo "Coverage or custom static analysis rule failed!"
            echo "ABORTING commmit!"
        exit 1
        fi
This is shown below in the screencast

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/commit%20fail%20on%20coverage.gif)

###Analysis section

We have used the static analysis tool **PMD** to run static analysis on our code. For this analysis, we have used basic ruleset as well as defined our own custom rule <code>CheckRequireParams</code> which checks if the require function takes only one parameter. As a result of the analysis, an xml file <code>pmd.xml</code> is generated which mentions the violations in the code. The screenshot for the pmd.xml is as follows<br>

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/pmdxml.png)

We have also ensured that if the analysis reports any violation of the custom rule in the code, then the commit is rejected.

        node parser.js
        RETVAL=$?
        if [ $RETVAL -ne 0 ]
        then
            echo ""
            echo "Coverage or custom static analysis rule failed!"
            echo "ABORTING commmit!"
        exit 1
        fi   fi
    
This is shown below in the screencast<br>

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/pmd1.gif)


We have configured Jenkin, with the plugins which displays the results of the static analysis through graphs. The screenshot of one such representation is as follows:<br>

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/JenkinsStaticAnalysis.png)


###Check for security tokens or ssh keys
Through the script <code>check_key.ssh</code> we are checking for the following conditions to assure that no security token or ssh keys are present in the files that are added to the commit. If any such key is detected, the commit is rejected<br>
*   Any PEM or PPK file is found<br>
            <code>[ ${FILE##*.} = "pem" ] || [ ${FILE##*.} = "ppk" ]</code><br>
*   Any regular expression of characters matching the length between 20 and 40<br>
            <code>'(?<![A-Z0-9])[A-Z0-9]{20,40}(?![A-Z0-9])' </code><br>
*   Any regular expression of characters matching the length between 40 and 80<br>
            <code>'(?<![A-Za-z0-9+=])[A-Za-z0-9+=]{40,80}(?![A-Za-z0-9+=])'</code><br>
*   Any String containing the expression<br>
            <code>"BEGIN RSA PRIVATE KEY"</code><br>
*   Any file with config tokens<br>
            <code>"config.token"</code>

The screenshot showing an example of a key violation is as follows :<br><br>
![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/KeyViolation.png)

The screencast is as follows:

![Image](https://github.com/prashantgupta24/node-randomstring/blob/master/Screenshots%2Bcasts/private%20keys%2Bpem.gif)





