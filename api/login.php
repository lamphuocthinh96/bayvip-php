<?php
session_start();
die('{"AccountID":15291235,"AvartarID":1,"UserName":"onlytop102","Nickname":"Oklogin","TotalGold":0,"TotalVP":0,"IsOtp":0,"OtpToken":null,"MerchantID":2,"RegionID":0}');

$input = file_get_contents('php://input');
$input = json_decode($input, true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bayvip.net/id/api//Authen/login',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{username: "onlytop102", password: "11549000p", passwordMD5: "a5fdc692d22754026ada0f135ebf4070"}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Cookie: .fanvip=1E20FD61E5A988C7F536E1507A135FE7E7F0F9B9933DE36F0961FFE340FE93FAE241A1B4AA4D35EAEC37BC79B106667072D40B85D23B6F2A89AD67FCA09E075241642C04C367956C463A5D5FBE59292E90FD4FF24C8D036E73F1C784D6181C1A7867D26D083C3239CEB7684F9EF2B0AF72375D8B4C29A6378CCA35A07E26E02BEA2917D65E0B8FF6AA034124FAA81A47014B817D4403B62FEE067446D5FAF5F46DA99ED0088E88C01040D12FCA9F972B0E393CF8D1613F5DAF81EC045038171B56C50C20FBB3D2CF5391AC6544536A81C6E6EB5325206AAD309D34E4A31EC40C7CA90F2ACF539A9A99CD2CB9A6448E422D6A7F75E0EE06594FA9F10FB46405672977431D58463D3C080AC965E8C244ED56FEC81107EA3A496D3782459F05B90BED178A1AD918A96CF9074AF8CF744B452164C998F0BA7ABB255B3DE55505594530FFE6F05255476130AC6B02E374CC41B1CBD3575A03006625148A7185C883EBB00D71ACD72E4D51543FE168B31B1D6A2DD89E04FFD06C9983C4ACE4DEA2C021A8B2D0A16E53C61B07A15059F0F853CD65977FBCAAE659DBEF10A7EE6FAEF71212851464A49CD21DD831AFE908FEEC26D596F0E0822F100E87E95FE03B541F2D3BE2BB8AEE2B40400A191CDD148573694127E31D75480BE8A85174FEB27401E0CFA63FAA34ADE3737DA465A697B7DC2C603E9272739F1C8856833118063826FA58A0D016F69C914C2B42041FBF712448E80D973BB55275AB17BFD5F74EB222545D25CC9A'
  ),
));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HEADER, 1);

$response = curl_exec($curl);

$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

$info = json_decode($body);

curl_close($curl);

foreach (explode("\r\n", $header) as $i => $line) {
    if ($i === 0) {
//        $headers['http_code'] = $line;
    } else {
        if (strpos($line, ': ') > 0) {
            list ($key, $value) = explode(': ', $line);
            if (strpos(strtolower($key), 'set-cookie') !== false) {
                header($key . ': ' . $value);
                // if (strpos($value, 'sieuno.vin') > 0) {
                //     session_destroy();
                //     session_start();
//                    echo "{$value} = <br/> ${key} <br/>";
                    $cookie = substr($value, 0, strpos($value, ";"));
                    $_SESSION['cookie'] = $cookie;
                // }
            }
        }
    }
}
echo $body;

// http://nhat88.vin/tx//signalr/negotiate?clientProtocol=1.5&connectionData=%5B%7B%22name%22%3A%22minigametxhub%22%7D%5D&_=1658761704850
//[, string $value = "" [, int $expires = 0 [, string $path = "" [, string $domain = "" [, bool $secure [, bool $httponly [, array $options = [] ]]]]]]]