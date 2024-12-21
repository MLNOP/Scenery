<?php
require_once './inc/bootstrap.php';
$env = get_env()['env'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        http-equiv="X-UA-Compatible"
        content="IE=edge"
    >

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>The Scenery</title>

    <?php vite_enqueue_script('src/scripts/app.js', true); ?>
</head>

<body>
    <main class="content-wrapper">

        <?php require_once './inc/components/canvas.php'; ?>
        <?php
            if (!isset($_GET['no-controls'])) {
                require_once './inc/components/config.php';
            }
		?>

    </main>
</body>

</html>
