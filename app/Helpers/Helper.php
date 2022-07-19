<?php
namespace App\Helpers;
 class   Helper{

     static   function tax_period()
    {
        $curYear = date("y", time());
        $prevYear = $curYear - 1;
        $nextYear = $curYear + 1;
        $curDate = mktime(0, 0, 0, date("m"), date("d"), $curYear);
        $firstHalf1 = mktime(0, 0, 0, 1, 1, $curYear);
        $firstHalf2 = mktime(0, 0, 0, 6, 30, $curYear);
        $secondHalf1 = mktime(0, 0, 0, 7, 1, $curYear);
        $secondHalf2 = mktime(0, 0, 0, 12, 31, $curYear);
        /*echo "curYear : ".$curYear."<br>";
        echo "CurDate : ".$curDate." - ".date("Y-m-d",$curDate)."<br>";
        echo "firstHalf1 : ".$firstHalf1." - ".date("Y-m-d",$firstHalf1)."<br>";
        echo "firstHalf2 : ".$firstHalf2." - ".date("Y-m-d",$firstHalf2)."<br>";
        echo "secondHalf1 : ".$secondHalf1." - ".date("Y-m-d",$secondHalf1)."<br>";
        echo "secondHalf2 : ".$secondHalf2." - ".date("Y-m-d",$secondHalf2)."<br>";*/
        if ($curDate >= $firstHalf1 && $curDate <= $firstHalf2) {
            return $prevYear . "-" . $curYear;
        } else if ($curDate >= $secondHalf1 && $curDate <= $secondHalf2) {
            return $curYear . "-" . $nextYear;
        }
    }

     static  function add_nulls($int, $cnt = 5)
    {
        $int = intval($int);
        $nulls = '';
        for ($i = 0; $i < ($cnt - strlen($int)); $i++)
            $nulls .= '0';
        return $nulls . $int;
    }


    public static function  generate_v_no($prefix, $offset)
    {

        $no=$prefix.self::add_nulls($offset)."/".self::tax_period();
        return $no;
    }
}