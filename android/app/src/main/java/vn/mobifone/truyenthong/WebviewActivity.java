package vn.mobifone.truyenthong;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class WebviewActivity extends AppCompatActivity {

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setContentView(R.layout.ttwebview);

        mWebView = this.findViewById(R.id.webview);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);
        mWebView.getSettings().setLoadWithOverviewMode(true);
        mWebView.getSettings().setUseWideViewPort(true);

        String url = this.getIntent().getStringExtra("URL");
        String html = this.getIntent().getStringExtra("HTML");
        if (url != null) {
            mWebView.loadUrl(url);
        } else {
            mWebView.loadData(html, "text/html; charset=utf-8", "UTF-8");
        }


    }
}
