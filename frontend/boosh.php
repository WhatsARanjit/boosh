<?php
$string = $_GET['r'];
if ($string) {
  $query = urlencode($string);

  $ch = curl_init("https://boosh-api.herokuapp.com/?q=${query}");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_USERAGENT, 'BooshAgent/0.1 (whatsaranjit.com/boosh)');
  $raw = curl_exec($ch);
  $info = curl_getinfo($ch);
  curl_close($ch);

  $data = json_decode($raw);
  $murl = $data->{'murl'};
  $desc = htmlspecialchars($string);
}
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-76383475-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-76383475-1');
</script>
<!--- Close Global site tag -->

<?php if ($string) { ?>
  <meta property="og:title" content="BOOSH - <?php echo $desc; ?>">
  <meta property="og:description" content="The image most closely associated with '<?php echo $string; ?>'.">
  <meta property="og:image" content="<?php echo $murl; ?>">
  <meta property="og:url" content="http:/whatsaranjit.com/boosh.php?q=<?php echo $string; ?>">
  <title>BOOSH - <?php echo $desc; ?></title>
<?php } else { ?>
  <meta property="og:title" content="BOOSH">
  <meta property="og:description" content="Find the image most associated with a term.">
  <meta property="og:url" content="http://whatsaranjit.com/boosh.php">
  <title>BOOSH</title>
<?php }; ?>
  <meta charset='utf-8'>
  <meta http-equiv="X-UA-Compatible" content="chrome=1">
  <link rel="icon" href="/ico/favicon.ico">
  <link href="https://bootswatch.com/4/darkly/bootstrap.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>

<body><center>

<div class="row-fluid">&nbsp;</div>
<div class="row-fluid">
  <div class="col-lg-5"></div>
  <div class="col-lg-2">
  <h1>BOOSH!</h1>
    <form class="form-inline">
      <div class="input-group">
      <input class="form-control form-control-sm" type="text" placeholder="boosh" id="boosh" name="r" autofocus />
        <button type="submit" class="btn btn-secondary btn-sm">boosh</button>
      </div>
    </form>
  </div>
  <div class="col-lg-5"></div>
</div>

<?php if ($string) { ?>

<style>
img.boosh {
  max-width: 60%;
  height: auto;
}
</style>

<div class="row-fluid">&nbsp;</div>
<div class="row-fluid">
  <div class="col-lg-12">
    <img class="boosh" alt="<?php echo $desc; ?>" src="<?php echo $murl; ?>">
  </div>
</div>
<div class="row-fluid">&nbsp;</div>
<?php }; ?>

<div class="row-fluid">&nbsp;</div>
<div class="row-fluid">
  <div class="col-lg-12">
    <p><small>WhatsARanjit | BOOSH</small></p>
  </div>
</div>

<?php if (!$string) { ?>
<iframe src='https://boosh-api.herokuapp.com/?health=1' style="width:0;height:0;border:0; border:none;"></iframe>
<?php }; ?>

</center></body>
</html>
