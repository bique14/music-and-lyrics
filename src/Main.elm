port module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (src)
import Html.Events exposing (onClick)



-- ports


port playAudio : () -> Cmd msg



-- subscriptions


port recievedLyrics : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    recievedLyrics ReceivedLyrics



-- Model


type alias Model =
    { lyric : String }


type Msg
    = ReceivedLyrics String


initialModel : Model
initialModel =
    { lyric = "" }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModel, playAudio () )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ReceivedLyrics str ->
            let
                { lyric } =
                    model

                str_ =
                    lyric ++ str ++ "\n"
            in
            ( { model | lyric = str_ }, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ text "hello world"
        , viewLyric model
        ]


viewLyric : Model -> Html Msg
viewLyric { lyric } =
    pre [] [ text lyric ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
