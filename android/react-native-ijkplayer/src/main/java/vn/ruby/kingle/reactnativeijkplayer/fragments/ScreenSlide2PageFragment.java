package vn.ruby.kingle.reactnativeijkplayer.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

import co.ceryle.fitgridview.FitGridView;
import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.adapter.ItemAdapter;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;

/**
 * Created by vuong.lequoc on 20/03/2018.
 */

public class ScreenSlide2PageFragment extends Fragment {


    // customize list camera
    private FitGridView gridView;
    private ItemAdapter adapter;
    private ArrayList<CameraInfo> camList;
    private int pageIndex;


    // newInstance constructor for creating fragment with arguments
    public static ScreenSlide2PageFragment newInstance(ArrayList<CameraInfo> cameraList, int pageIndex) {
        ScreenSlide2PageFragment fragmentFirst = new ScreenSlide2PageFragment();
        Bundle args = new Bundle();
        args.putSerializable("cameraList", cameraList);
        args.putInt("pageIndex", pageIndex);
        fragmentFirst.setArguments(args);
        return fragmentFirst;
    }

    // Store instance variables based on arguments passed
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ArrayList<CameraInfo> cameraList = (ArrayList<CameraInfo>) getArguments().getSerializable("cameraList");

        pageIndex  = getArguments().getInt("pageIndex");
        camList = new ArrayList<CameraInfo>();
        for(int i = 4 * pageIndex; i < cameraList.size(); ++i) {
            if(cameraList.get(i) != null) {
                camList.add(cameraList.get(i));
            }
        }
        for(int i = cameraList.size(); i < 4 * (pageIndex + 1); ++i) {
            camList.add(new CameraInfo());
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(
                R.layout.fragment_screen_slide_page, container, false);

        gridView = (FitGridView) rootView.findViewById(R.id.gridView);
        adapter = new ItemAdapter(getActivity(), camList, 2);
        gridView.setFitGridAdapter(adapter);
        changeSize(2, 2);
        return rootView;
    }


    private void changeSize(int r, int c) {
        gridView.setNumRows(r);
        gridView.setNumColumns(c);
        gridView.update();
    }


}
