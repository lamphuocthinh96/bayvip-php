<?php

$callback = $_GET['callback'];

die($callback . '({
    "Response": "started"
});');