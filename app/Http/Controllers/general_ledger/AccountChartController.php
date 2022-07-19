<?php

namespace App\Http\Controllers\general_ledger;
use App\Http\Controllers\Controller;


use App\Models\AccountChart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = AccountChart::all();

        return Inertia::render('general_ledger/accountChart/index',['title'=>'Accounts','sub_title'=>'Account Chart','data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AccountChart  $accountChart
     * @return \Illuminate\Http\Response
     */
    public function show(AccountChart $accountChart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AccountChart  $accountChart
     * @return \Illuminate\Http\Response
     */
    public function edit(AccountChart $accountChart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AccountChart  $accountChart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AccountChart $accountChart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccountChart  $accountChart
     * @return \Illuminate\Http\Response
     */
    public function destroy(AccountChart $accountChart)
    {
        //
    }
}
